<?php
/**
 * Plugin Name: WhatsApp Vendor Redirect
 * Plugin URI: https://yourwebsite.com
 * Description: Elementor widget to redirect customers to WhatsApp vendors based on their location selection.
 * Version: 1.0.0
 * Author: Your Name
 * Text Domain: whatsapp-vendor-redirect
 * Domain Path: /languages
 * Requires at least: 5.0
 * Tested up to: 6.4
 * Requires PHP: 7.4
 * Elementor tested up to: 3.18
 * Elementor Pro tested up to: 3.18
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('WVR_PLUGIN_URL', plugin_dir_url(__FILE__));
define('WVR_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('WVR_PLUGIN_VERSION', '1.0.0');

/**
 * Main Plugin Class
 */
class WhatsApp_Vendor_Redirect {
    
    public function __construct() {
        add_action('init', [$this, 'init']);
        add_action('plugins_loaded', [$this, 'load_textdomain']);
        register_activation_hook(__FILE__, [$this, 'activate']);
        register_deactivation_hook(__FILE__, [$this, 'deactivate']);
    }
    
    public function init() {
        // Check if Elementor is installed and activated
        if (!did_action('elementor/loaded')) {
            add_action('admin_notices', [$this, 'admin_notice_missing_elementor']);
            return;
        }
        
        // Initialize the plugin
        add_action('elementor/widgets/widgets_registered', [$this, 'register_widgets']);
        add_action('elementor/frontend/after_enqueue_styles', [$this, 'enqueue_frontend_styles']);
        add_action('elementor/frontend/after_register_scripts', [$this, 'enqueue_frontend_scripts']);
        
        // Admin menu
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('admin_init', [$this, 'admin_init']);
        
        // AJAX handlers
        add_action('wp_ajax_wvr_save_cities', [$this, 'save_cities']);
        add_action('wp_ajax_wvr_get_cities', [$this, 'get_cities']);
    }
    
    public function load_textdomain() {
        load_plugin_textdomain('whatsapp-vendor-redirect', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function activate() {
        // Create default options
        $default_cities = [
            'SP' => [
                'name' => 'São Paulo',
                'cities' => [
                    'São Paulo' => ['5511999999991', '5511999999992'],
                    'Campinas' => ['5519999999991', '5519999999992'],
                    'Guarulhos' => '5511888888881'
                ]
            ],
            'MG' => [
                'name' => 'Minas Gerais',
                'cities' => [
                    'Belo Horizonte' => ['5531999999991', '5531999999992'],
                    'Poços de Caldas' => '5535888888881'
                ]
            ]
        ];
        
        add_option('wvr_cities_data', $default_cities);
        add_option('wvr_default_vendor', '5511000000000');
        add_option('wvr_message_template', 'Olá! Vim do site e gostaria de mais informações.\nEstado: {state}\nCidade: {city}');
    }
    
    public function deactivate() {
        // Cleanup if needed
    }
    
    public function admin_notice_missing_elementor() {
        if (isset($_GET['activate'])) unset($_GET['activate']);
        
        $message = sprintf(
            esc_html__('"%1$s" requires "%2$s" to be installed and activated.', 'whatsapp-vendor-redirect'),
            '<strong>' . esc_html__('WhatsApp Vendor Redirect', 'whatsapp-vendor-redirect') . '</strong>',
            '<strong>' . esc_html__('Elementor', 'whatsapp-vendor-redirect') . '</strong>'
        );
        
        printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
    }
    
    public function register_widgets() {
        require_once WVR_PLUGIN_PATH . 'includes/widgets/whatsapp-redirect-widget.php';
        \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new \WVR_WhatsApp_Redirect_Widget());
    }
    
    public function enqueue_frontend_styles() {
        wp_enqueue_style('wvr-frontend', WVR_PLUGIN_URL . 'assets/css/frontend.css', [], WVR_PLUGIN_VERSION);
    }
    
    public function enqueue_frontend_scripts() {
        wp_enqueue_script('wvr-frontend', WVR_PLUGIN_URL . 'assets/js/frontend.js', ['jquery'], WVR_PLUGIN_VERSION, true);
        wp_localize_script('wvr-frontend', 'wvr_ajax', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('wvr_nonce')
        ]);
    }
    
    public function add_admin_menu() {
        add_menu_page(
            __('WhatsApp Vendor Redirect', 'whatsapp-vendor-redirect'),
            __('WA Vendor Redirect', 'whatsapp-vendor-redirect'),
            'manage_options',
            'whatsapp-vendor-redirect',
            [$this, 'admin_page'],
            'data:image/svg+xml;base64,' . base64_encode('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>'),
            30
        );
    }
    
    public function admin_init() {
        wp_enqueue_style('wvr-admin', WVR_PLUGIN_URL . 'assets/css/admin.css', [], WVR_PLUGIN_VERSION);
        wp_enqueue_script('wvr-admin', WVR_PLUGIN_URL . 'assets/js/admin.js', ['jquery'], WVR_PLUGIN_VERSION, true);
        wp_localize_script('wvr-admin', 'wvr_admin_ajax', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('wvr_admin_nonce')
        ]);
    }
    
    public function admin_page() {
        require_once WVR_PLUGIN_PATH . 'includes/admin/admin-page.php';
    }
    
    public function save_cities() {
        check_ajax_referer('wvr_admin_nonce', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have sufficient permissions to access this page.'));
        }
        
        $cities_data = json_decode(stripslashes($_POST['cities_data']), true);
        $default_vendor = sanitize_text_field($_POST['default_vendor']);
        $message_template = sanitize_textarea_field($_POST['message_template']);
        
        update_option('wvr_cities_data', $cities_data);
        update_option('wvr_default_vendor', $default_vendor);
        update_option('wvr_message_template', $message_template);
        
        wp_send_json_success(__('Settings saved successfully!', 'whatsapp-vendor-redirect'));
    }
    
    public function get_cities() {
        check_ajax_referer('wvr_nonce', 'nonce');
        
        $cities_data = get_option('wvr_cities_data', []);
        $default_vendor = get_option('wvr_default_vendor', '5511000000000');
        $message_template = get_option('wvr_message_template', 'Olá! Vim do site e gostaria de mais informações.\nEstado: {state}\nCidade: {city}');
        
        wp_send_json_success([
            'cities_data' => $cities_data,
            'default_vendor' => $default_vendor,
            'message_template' => $message_template
        ]);
    }
}

// Initialize the plugin
new WhatsApp_Vendor_Redirect();
