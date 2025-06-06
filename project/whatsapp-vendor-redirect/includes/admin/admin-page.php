<?php
if (!defined('ABSPATH')) {
    exit;
}

$cities_data = get_option('wvr_cities_data', []);
$default_vendor = get_option('wvr_default_vendor', '5511000000000');
$message_template = get_option('wvr_message_template', 'Olá! Vim do site e gostaria de mais informações.\nEstado: {state}\nCidade: {city}');
?>

<div class="wrap wvr-admin-wrap">
    <h1><?php _e('WhatsApp Vendor Redirect Settings', 'whatsapp-vendor-redirect'); ?></h1>
    
    <div class="wvr-admin-container">
        <div class="wvr-admin-header">
            <div class="wvr-admin-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </div>
            <div>
                <h2><?php _e('Manage Cities and Vendors', 'whatsapp-vendor-redirect'); ?></h2>
                <p><?php _e('Configure states, cities, and their corresponding WhatsApp vendor numbers.', 'whatsapp-vendor-redirect'); ?></p>
            </div>
        </div>
        
        <form id="wvr-admin-form">
            <div class="wvr-admin-section">
                <h3><?php _e('General Settings', 'whatsapp-vendor-redirect'); ?></h3>
                
                <table class="form-table">
                    <tr>
                        <th scope="row">
                            <label for="default_vendor"><?php _e('Default Vendor Number', 'whatsapp-vendor-redirect'); ?></label>
                        </th>
                        <td>
                            <input type="text" id="default_vendor" name="default_vendor" value="<?php echo esc_attr($default_vendor); ?>" class="regular-text" />
                            <p class="description"><?php _e('Default WhatsApp number used when no specific vendor is assigned to a city.', 'whatsapp-vendor-redirect'); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">
                            <label for="message_template"><?php _e('Message Template', 'whatsapp-vendor-redirect'); ?></label>
                        </th>
                        <td>
                            <textarea id="message_template" name="message_template" rows="4" class="large-text"><?php echo esc_textarea($message_template); ?></textarea>
                            <p class="description"><?php _e('Use {state} and {city} placeholders. They will be replaced with the selected values.', 'whatsapp-vendor-redirect'); ?></p>
                        </td>
                    </tr>
                </table>
            </div>
            
            <div class="wvr-admin-section">
                <h3><?php _e('States and Cities Configuration', 'whatsapp-vendor-redirect'); ?></h3>
                
                <div id="wvr-states-container">
                    <?php foreach ($cities_data as $state_code => $state_data): ?>
                        <div class="wvr-state-item" data-state="<?php echo esc_attr($state_code); ?>">
                            <div class="wvr-state-header">
                                <h4><?php echo esc_html($state_data['name']); ?> (<?php echo esc_html($state_code); ?>)</h4>
                                <button type="button" class="button wvr-remove-state"><?php _e('Remove State', 'whatsapp-vendor-redirect'); ?></button>
                            </div>
                            
                            <div class="wvr-state-fields">
                                <input type="hidden" class="state-code" value="<?php echo esc_attr($state_code); ?>" />
                                <input type="text" class="state-name" value="<?php echo esc_attr($state_data['name']); ?>" placeholder="<?php _e('State Name', 'whatsapp-vendor-redirect'); ?>" />
                            </div>
                            
                            <div class="wvr-cities-container">
                                <h5><?php _e('Cities', 'whatsapp-vendor-redirect'); ?></h5>
                                <div class="wvr-cities-list">
                                    <?php foreach ($state_data['cities'] as $city_name => $vendor_numbers): ?>
                                        <div class="wvr-city-item">
                                            <input type="text" class="city-name" value="<?php echo esc_attr($city_name); ?>" placeholder="<?php _e('City Name', 'whatsapp-vendor-redirect'); ?>" />
                                            <input type="text" class="city-vendors" value="<?php echo esc_attr(is_array($vendor_numbers) ? implode(',', $vendor_numbers) : $vendor_numbers); ?>" placeholder="<?php _e('Vendor Numbers (comma separated)', 'whatsapp-vendor-redirect'); ?>" />
                                            <button type="button" class="button wvr-remove-city"><?php _e('Remove', 'whatsapp-vendor-redirect'); ?></button>
                                        </div>
                                    <?php endforeach; ?>
                                </div>
                                <button type="button" class="button wvr-add-city"><?php _e('Add City', 'whatsapp-vendor-redirect'); ?></button>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
                
                <div class="wvr-add-state-section">
                    <button type="button" id="wvr-add-state" class="button button-secondary"><?php _e('Add New State', 'whatsapp-vendor-redirect'); ?></button>
                </div>
            </div>
            
            <p class="submit">
                <button type="submit" class="button button-primary"><?php _e('Save Settings', 'whatsapp-vendor-redirect'); ?></button>
            </p>
        </form>
    </div>
</div>

<!-- State Template -->
<script type="text/template" id="wvr-state-template">
    <div class="wvr-state-item" data-state="">
        <div class="wvr-state-header">
            <h4><?php _e('New State', 'whatsapp-vendor-redirect'); ?></h4>
            <button type="button" class="button wvr-remove-state"><?php _e('Remove State', 'whatsapp-vendor-redirect'); ?></button>
        </div>
        
        <div class="wvr-state-fields">
            <input type="text" class="state-code" placeholder="<?php _e('State Code (e.g., SP)', 'whatsapp-vendor-redirect'); ?>" />
            <input type="text" class="state-name" placeholder="<?php _e('State Name', 'whatsapp-vendor-redirect'); ?>" />
        </div>
        
        <div class="wvr-cities-container">
            <h5><?php _e('Cities', 'whatsapp-vendor-redirect'); ?></h5>
            <div class="wvr-cities-list"></div>
            <button type="button" class="button wvr-add-city"><?php _e('Add City', 'whatsapp-vendor-redirect'); ?></button>
        </div>
    </div>
</script>

<!-- City Template -->
<script type="text/template" id="wvr-city-template">
    <div class="wvr-city-item">
        <input type="text" class="city-name" placeholder="<?php _e('City Name', 'whatsapp-vendor-redirect'); ?>" />
        <input type="text" class="city-vendors" placeholder="<?php _e('Vendor Numbers (comma separated)', 'whatsapp-vendor-redirect'); ?>" />
        <button type="button" class="button wvr-remove-city"><?php _e('Remove', 'whatsapp-vendor-redirect'); ?></button>
    </div>
</script>