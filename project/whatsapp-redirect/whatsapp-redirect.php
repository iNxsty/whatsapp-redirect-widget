<?php
/**
 * Plugin Name: WhatsApp Redirect
 * Description: Widget Elementor para redirecionamento de WhatsApp baseado em localização
 * Version: 1.0.0
 * Author: iNxyst
 */

if (!defined('ABSPATH')) {
    exit;
}

final class WhatsApp_Redirect {
    const VERSION = '1.0.0';
    const MINIMUM_ELEMENTOR_VERSION = '3.0.0';
    const MINIMUM_PHP_VERSION = '7.4';

    private static $_instance = null;

    public static function instance() {
        if (is_null(self::$_instance)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct() {
        add_action('plugins_loaded', [$this, 'init']);
    }

    public function init() {
        // Check if Elementor installed and activated
        if (!did_action('elementor/loaded')) {
            add_action('admin_notices', [$this, 'admin_notice_missing_main_plugin']);
            return;
        }

        // Check for required Elementor version
        if (!version_compare(ELEMENTOR_VERSION, self::MINIMUM_ELEMENTOR_VERSION, '>=')) {
            add_action('admin_notices', [$this, 'admin_notice_minimum_elementor_version']);
            return;
        }

        // Check for required PHP version
        if (version_compare(PHP_VERSION, self::MINIMUM_PHP_VERSION, '<')) {
            add_action('admin_notices', [$this, 'admin_notice_minimum_php_version']);
            return;
        }

        // Add Plugin actions
        add_action('elementor/widgets/widgets_registered', [$this, 'init_widgets']);
        add_action('elementor/frontend/after_enqueue_styles', [$this, 'widget_styles']);
        add_action('elementor/frontend/after_register_scripts', [$this, 'widget_scripts']);
    }

    public function widget_styles() {
        wp_register_style('whatsapp-redirect', plugins_url('assets/css/style.css', __FILE__));
        wp_enqueue_style('whatsapp-redirect');
    }

    public function widget_scripts() {
        wp_register_script(
            'whatsapp-redirect',
            plugins_url('assets/js/whatsapp-redirect.js', __FILE__),
            ['jquery'],
            self::VERSION,
            true
        );
        wp_enqueue_script('whatsapp-redirect');
    }

    public function init_widgets() {
        require_once(__DIR__ . '/widgets/whatsapp-redirect-widget.php');
        \Elementor\Plugin::instance()->widgets_manager->register_widget_type(new \Elementor_WhatsApp_Redirect_Widget());
    }

    public function admin_notice_missing_main_plugin() {
        if (isset($_GET['activate'])) unset($_GET['activate']);

        $message = sprintf(
            esc_html__('"%1$s" requires "%2$s" to be installed and activated.', 'elementor-test-extension'),
            '<strong>' . esc_html__('WhatsApp Redirect', 'elementor-test-extension') . '</strong>',
            '<strong>' . esc_html__('Elementor', 'elementor-test-extension') . '</strong>'
        );

        printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
    }

    public function admin_notice_minimum_elementor_version() {
        if (isset($_GET['activate'])) unset($_GET['activate']);

        $message = sprintf(
            esc_html__('"%1$s" requires "%2$s" version %3$s or greater.', 'elementor-test-extension'),
            '<strong>' . esc_html__('WhatsApp Redirect', 'elementor-test-extension') . '</strong>',
            '<strong>' . esc_html__('Elementor', 'elementor-test-extension') . '</strong>',
            self::MINIMUM_ELEMENTOR_VERSION
        );

        printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
    }

    public function admin_notice_minimum_php_version() {
        if (isset($_GET['activate'])) unset($_GET['activate']);

        $message = sprintf(
            esc_html__('"%1$s" requires PHP version %2$s or greater.', 'elementor-test-extension'),
            '<strong>' . esc_html__('WhatsApp Redirect', 'elementor-test-extension') . '</strong>',
            self::MINIMUM_PHP_VERSION
        );

        printf('<div class="notice notice-warning is-dismissible"><p>%1$s</p></div>', $message);
    }
}

WhatsApp_Redirect::instance();