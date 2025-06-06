(function($) {
    'use strict';
    
    $(document).ready(function() {
        initWhatsAppRedirect();
    });
    
    function initWhatsAppRedirect() {
        const $stateSelect = $('#wvr-state');
        const $citySelect = $('#wvr-city');
        const $cityGroup = $('#wvr-city-group');
        const $whatsappButton = $('#wvr-whatsapp-button');
        
        // Get cities data from the JSON script tag
        const citiesDataScript = document.getElementById('wvr-cities-data');
        let citiesData = {};
        
        if (citiesDataScript) {
            try {
                citiesData = JSON.parse(citiesDataScript.textContent);
            } catch (e) {
                console.error('Error parsing cities data:', e);
                return;
            }
        }
        
        // State change handler
        $stateSelect.on('change', function() {
            const selectedState = $(this).val();
            
            // Reset city selection
            $citySelect.html('<option value="">Selecione a cidade</option>');
            $cityGroup.hide();
            $whatsappButton.hide();
            
            if (selectedState && citiesData[selectedState]) {
                const cities = citiesData[selectedState].cities;
                
                // Populate cities
                Object.keys(cities).forEach(function(cityName) {
                    $citySelect.append(
                        $('<option></option>').val(cityName).text(cityName)
                    );
                });
                
                // Show city group with animation
                $cityGroup.show().addClass('wvr-slide-in');
            }
        });
        
        // City change handler
        $citySelect.on('change', function() {
            const selectedCity = $(this).val();
            
            if (selectedCity) {
                $whatsappButton.show().addClass('wvr-slide-in');
            } else {
                $whatsappButton.hide();
            }
        });
        
        // WhatsApp button click handler
        $whatsappButton.on('click', function() {
            const selectedState = $stateSelect.val();
            const selectedCity = $citySelect.val();
            
            if (!selectedState || !selectedCity) {
                alert('Por favor, selecione o estado e a cidade.');
                return;
            }
            
            // Get vendor number
            const vendorNumber = getVendorNumber(selectedCity, citiesData);
            
            // Get state name
            const stateName = citiesData[selectedState].name;
            
            // Get message template and replace placeholders
            getMessageTemplate(function(messageTemplate) {
                const message = messageTemplate
                    .replace('{state}', stateName)
                    .replace('{city}', selectedCity);
                
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${vendorNumber}?text=${encodedMessage}`;
                
                // Open WhatsApp
                window.open(whatsappUrl, '_blank');
            });
        });
    }
    
    function getVendorNumber(city, citiesData) {
        // Find the city in the data
        for (const stateCode in citiesData) {
            const stateData = citiesData[stateCode];
            if (stateData.cities && stateData.cities[city]) {
                const vendor = stateData.cities[city];
                
                if (Array.isArray(vendor)) {
                    // Simple distribution - alternate based on time
                    const index = Math.floor(Date.now() / 1000) % vendor.length;
                    return vendor[index];
                }
                
                return vendor;
            }
        }
        
        // Return default vendor if not found
        return '5511000000000';
    }
    
    function getMessageTemplate(callback) {
        // Get message template via AJAX
        $.ajax({
            url: wvr_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'wvr_get_cities',
                nonce: wvr_ajax.nonce
            },
            success: function(response) {
                if (response.success && response.data.message_template) {
                    callback(response.data.message_template);
                } else {
                    // Fallback message
                    callback('Olá! Vim do site e gostaria de mais informações.\nEstado: {state}\nCidade: {city}');
                }
            },
            error: function() {
                // Fallback message
                callback('Olá! Vim do site e gostaria de mais informações.\nEstado: {state}\nCidade: {city}');
            }
        });
    }
    
    // Animation classes
    $(document).on('animationend', '.wvr-slide-in', function() {
        $(this).removeClass('wvr-slide-in');
    });
    
})(jQuery);