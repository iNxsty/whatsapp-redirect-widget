<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Elementor WhatsApp Redirect Widget
 */
class WVR_WhatsApp_Redirect_Widget extends \Elementor\Widget_Base {
    
    public function get_name() {
        return 'whatsapp_redirect';
    }
    
    public function get_title() {
        return __('WhatsApp Vendor Redirect', 'whatsapp-vendor-redirect');
    }
    
    public function get_icon() {
        return 'eicon-whatsapp';
    }
    
    public function get_categories() {
        return ['general'];
    }
    
    public function get_keywords() {
        return ['whatsapp', 'vendor', 'redirect', 'contact', 'form'];
    }
    
    protected function register_controls() {
        
        // Content Section
        $this->start_controls_section(
            'content_section',
            [
                'label' => __('Content', 'whatsapp-vendor-redirect'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );
        
        $this->add_control(
            'title',
            [
                'label' => __('Title', 'whatsapp-vendor-redirect'),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => __('Fale com um Vendedor', 'whatsapp-vendor-redirect'),
                'placeholder' => __('Enter title', 'whatsapp-vendor-redirect'),
            ]
        );
        
        $this->add_control(
            'description',
            [
                'label' => __('Description', 'whatsapp-vendor-redirect'),
                'type' => \Elementor\Controls_Manager::TEXTAREA,
                'default' => __('Selecione sua localização para ser direcionado ao vendedor responsável', 'whatsapp-vendor-redirect'),
                'placeholder' => __('Enter description', 'whatsapp-vendor-redirect'),
            ]
        );
        
        $this->add_control(
            'button_text',
            [
                'label' => __('Button Text', 'whatsapp-vendor-redirect'),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => __('Falar com Vendedor via WhatsApp', 'whatsapp-vendor-redirect'),
                'placeholder' => __('Enter button text', 'whatsapp-vendor-redirect'),
            ]
        );
        
        $this->end_controls_section();
        
        // Style Section
        $this->start_controls_section(
            'style_section',
            [
                'label' => __('Style', 'whatsapp-vendor-redirect'),
                'tab' => \Elementor\Controls_Manager::TAB_STYLE,
            ]
        );
        
        $this->add_control(
            'form_background_color',
            [
                'label' => __('Form Background Color', 'whatsapp-vendor-redirect'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#ffffff',
                'selectors' => [
                    '{{WRAPPER}} .wvr-form-card' => 'background-color: {{VALUE}}',
                ],
            ]
        );
        
        $this->add_control(
            'primary_color',
            [
                'label' => __('Primary Color', 'whatsapp-vendor-redirect'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#25D366',
                'selectors' => [
                    '{{WRAPPER}} .wvr-whatsapp-button' => 'background-color: {{VALUE}}',
                    '{{WRAPPER}} .wvr-select-field:focus' => 'border-color: {{VALUE}}',
                ],
            ]
        );
        
        $this->add_group_control(
            \Elementor\Group_Control_Typography::get_type(),
            [
                'name' => 'title_typography',
                'label' => __('Title Typography', 'whatsapp-vendor-redirect'),
                'selector' => '{{WRAPPER}} .wvr-form-title',
            ]
        );
        
        $this->add_group_control(
            \Elementor\Group_Control_Box_Shadow::get_type(),
            [
                'name' => 'form_shadow',
                'label' => __('Form Shadow', 'whatsapp-vendor-redirect'),
                'selector' => '{{WRAPPER}} .wvr-form-card',
            ]
        );
        
        $this->end_controls_section();
    }
    
    protected function render() {
        $settings = $this->get_settings_for_display();
        $cities_data = get_option('wvr_cities_data', []);
        ?>
        <div class="wvr-widget-container">
            <div class="wvr-form-card">
                <h3 class="wvr-form-title"><?php echo esc_html($settings['title']); ?></h3>
                <p class="wvr-form-description"><?php echo esc_html($settings['description']); ?></p>
                
                <div class="wvr-form-group">
                    <label for="wvr-state" class="wvr-label"><?php _e('Estado', 'whatsapp-vendor-redirect'); ?></label>
                    <select id="wvr-state" class="wvr-select-field">
                        <option value=""><?php _e('Selecione o estado', 'whatsapp-vendor-redirect'); ?></option>
                        <?php foreach ($cities_data as $state_code => $state_data): ?>
                            <option value="<?php echo esc_attr($state_code); ?>"><?php echo esc_html($state_data['name']); ?></option>
                        <?php endforeach; ?>
                    </select>
                </div>
                
                <div class="wvr-form-group" id="wvr-city-group" style="display: none;">
                    <label for="wvr-city" class="wvr-label"><?php _e('Cidade', 'whatsapp-vendor-redirect'); ?></label>
                    <select id="wvr-city" class="wvr-select-field">
                        <option value=""><?php _e('Selecione a cidade', 'whatsapp-vendor-redirect'); ?></option>
                    </select>
                </div>
                
                <button id="wvr-whatsapp-button" class="wvr-whatsapp-button" style="display: none;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    <?php echo esc_html($settings['button_text']); ?>
                </button>
            </div>
        </div>
        
        <script type="application/json" id="wvr-cities-data"><?php echo json_encode($cities_data); ?></script>
        <?php
    }
    
    protected function content_template() {
        ?>
        <#
        var citiesData = <?php echo json_encode(get_option('wvr_cities_data', [])); ?>;
        #>
        <div class="wvr-widget-container">
            <div class="wvr-form-card">
                <h3 class="wvr-form-title">{{{ settings.title }}}</h3>
                <p class="wvr-form-description">{{{ settings.description }}}</p>
                
                <div class="wvr-form-group">
                    <label class="wvr-label"><?php _e('Estado', 'whatsapp-vendor-redirect'); ?></label>
                    <select class="wvr-select-field">
                        <option value=""><?php _e('Selecione o estado', 'whatsapp-vendor-redirect'); ?></option>
                        <# _.each(citiesData, function(stateData, stateCode) { #>
                            <option value="{{ stateCode }}">{{ stateData.name }}</option>
                        <# }); #>
                    </select>
                </div>
                
                <div class="wvr-form-group">
                    <label class="wvr-label"><?php _e('Cidade', 'whatsapp-vendor-redirect'); ?></label>
                    <select class="wvr-select-field">
                        <option value=""><?php _e('Selecione a cidade', 'whatsapp-vendor-redirect'); ?></option>
                    </select>
                </div>
                
                <button class="wvr-whatsapp-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    {{{ settings.button_text }}}
                </button>
            </div>
        </div>
        <?php
    }
}