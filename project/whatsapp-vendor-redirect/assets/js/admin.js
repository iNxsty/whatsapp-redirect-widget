(function($) {
    'use strict';
    
    $(document).ready(function() {
        initAdminInterface();
    });
    
    function initAdminInterface() {
        // Add state functionality
        $('#wvr-add-state').on('click', function() {
            addNewState();
        });
        
        // Remove state functionality
        $(document).on('click', '.wvr-remove-state', function() {
            if (confirm('Are you sure you want to remove this state and all its cities?')) {
                $(this).closest('.wvr-state-item').remove();
            }
        });
        
        // Add city functionality
        $(document).on('click', '.wvr-add-city', function() {
            const $citiesList = $(this).siblings('.wvr-cities-list');
            addNewCity($citiesList);
        });
        
        // Remove city functionality
        $(document).on('click', '.wvr-remove-city', function() {
            $(this).closest('.wvr-city-item').remove();
        });
        
        // Update state data attribute when state code changes
        $(document).on('input', '.state-code', function() {
            const $stateItem = $(this).closest('.wvr-state-item');
            $stateItem.attr('data-state', $(this).val());
        });
        
        // Form submission
        $('#wvr-admin-form').on('submit', function(e) {
            e.preventDefault();
            saveSettings();
        });
    }
    
    function addNewState() {
        const template = $('#wvr-state-template').html();
        const $newState = $(template);
        
        $('#wvr-states-container').append($newState);
        
        // Focus on the state code input
        $newState.find('.state-code').focus();
        
        // Add animation
        $newState.hide().slideDown(300);
    }
    
    function addNewCity($citiesList) {
        const template = $('#wvr-city-template').html();
        const $newCity = $(template);
        
        $citiesList.append($newCity);
        
        // Focus on the city name input
        $newCity.find('.city-name').focus();
        
        // Add animation
        $newCity.hide().slideDown(300);
    }
    
    function saveSettings() {
        const $form = $('#wvr-admin-form');
        const $submitButton = $form.find('button[type="submit"]');
        
        // Show loading state
        $submitButton.prop('disabled', true).text('Saving...');
        
        // Collect form data
        const citiesData = {};
        const defaultVendor = $('#default_vendor').val();
        const messageTemplate = $('#message_template').val();
        
        // Process each state
        $('.wvr-state-item').each(function() {
            const $state = $(this);
            const stateCode = $state.find('.state-code').val().trim();
            const stateName = $state.find('.state-name').val().trim();
            
            if (stateCode && stateName) {
                citiesData[stateCode] = {
                    name: stateName,
                    cities: {}
                };
                
                // Process cities for this state
                $state.find('.wvr-city-item').each(function() {
                    const $city = $(this);
                    const cityName = $city.find('.city-name').val().trim();
                    const vendorNumbers = $city.find('.city-vendors').val().trim();
                    
                    if (cityName && vendorNumbers) {
                        // Parse vendor numbers (comma separated)
                        const vendors = vendorNumbers.split(',').map(v => v.trim()).filter(v => v);
                        
                        if (vendors.length === 1) {
                            citiesData[stateCode].cities[cityName] = vendors[0];
                        } else if (vendors.length > 1) {
                            citiesData[stateCode].cities[cityName] = vendors;
                        }
                    }
                });
            }
        });
        
        // Send AJAX request
        $.ajax({
            url: wvr_admin_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'wvr_save_cities',
                nonce: wvr_admin_ajax.nonce,
                cities_data: JSON.stringify(citiesData),
                default_vendor: defaultVendor,
                message_template: messageTemplate
            },
            success: function(response) {
                if (response.success) {
                    showMessage(response.data, 'success');
                } else {
                    showMessage('Error saving settings: ' + response.data, 'error');
                }
            },
            error: function() {
                showMessage('Error saving settings. Please try again.', 'error');
            },
            complete: function() {
                // Reset button state
                $submitButton.prop('disabled', false).text('Save Settings');
            }
        });
    }
    
    function showMessage(message, type) {
        // Remove existing messages
        $('.wvr-success-message, .wvr-error-message').remove();
        
        const messageClass = type === 'success' ? 'wvr-success-message' : 'wvr-error-message';
        const $message = $('<div class="' + messageClass + '">' + message + '</div>');
        
        // Insert message at the top of the form
        $('#wvr-admin-form').prepend($message);
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(function() {
                $message.fadeOut(300, function() {
                    $(this).remove();
                });
            }, 5000);
        }
        
        // Scroll to top to show the message
        $('html, body').animate({
            scrollTop: $message.offset().top - 100
        }, 300);
    }
    
})(jQuery);