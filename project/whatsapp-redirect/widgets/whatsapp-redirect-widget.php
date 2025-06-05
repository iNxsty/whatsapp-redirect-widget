<?php
class Elementor_WhatsApp_Redirect_Widget extends \Elementor\Widget_Base {
    public function get_name() {
        return 'whatsapp_redirect';
    }

    public function get_title() {
        return __('WhatsApp Redirect', 'elementor-test-extension');
    }

    public function get_icon() {
        return 'eicon-whatsapp';
    }

    public function get_categories() {
        return ['general'];
    }

    protected function _register_controls() {
        $this->start_controls_section(
            'content_section',
            [
                'label' => __('Configurações', 'elementor-test-extension'),
                'tab' => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'title',
            [
                'label' => __('Título', 'elementor-test-extension'),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => __('Fale com um Consultor', 'elementor-test-extension'),
            ]
        );

        $this->add_control(
            'subtitle',
            [
                'label' => __('Subtítulo', 'elementor-test-extension'),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => __('Selecione sua localização para conectar com um de nossos especialistas', 'elementor-test-extension'),
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'style_section',
            [
                'label' => __('Estilo', 'elementor-test-extension'),
                'tab' => \Elementor\Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'title_color',
            [
                'label' => __('Cor do Título', 'elementor-test-extension'),
                'type' => \Elementor\Controls_Manager::COLOR,
                'default' => '#333333',
                'selectors' => [
                    '{{WRAPPER}} .whatsapp-redirect-title' => 'color: {{VALUE}}',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="whatsapp-redirect-widget">
            <div class="whatsapp-redirect-header">
                <div class="whatsapp-redirect-icon">
                    <i class="eicon-whatsapp"></i>
                </div>
                <h2 class="whatsapp-redirect-title"><?php echo esc_html($settings['title']); ?></h2>
                <p class="whatsapp-redirect-subtitle"><?php echo esc_html($settings['subtitle']); ?></p>
            </div>
            
            <div class="whatsapp-redirect-form">
                <div class="form-step" data-step="1">
                    <label for="state">Selecione seu Estado</label>
                    <select id="state" class="whatsapp-redirect-select">
                        <option value="">Selecione um estado</option>
                        <?php
                        $states = $this->get_states();
                        foreach ($states as $value => $label) {
                            echo '<option value="' . esc_attr($value) . '">' . esc_html($label) . '</option>';
                        }
                        ?>
                    </select>
                </div>
                
                <div class="form-step" data-step="2" style="display: none;">
                    <label for="city">Selecione sua Cidade</label>
                    <select id="city" class="whatsapp-redirect-select">
                        <option value="">Selecione uma cidade</option>
                    </select>
                    <button type="button" class="whatsapp-redirect-button">
                        Falar com Consultor
                        <i class="eicon-send"></i>
                    </button>
                </div>
            </div>
        </div>
        <?php
    }

    private function get_states() {
        return [
            'MG' => 'Minas Gerais',
            'RJ' => 'Rio de Janeiro',
            'SP' => 'São Paulo',
        ];
    }
}