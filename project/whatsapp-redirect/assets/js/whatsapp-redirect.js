jQuery(document).ready(function($) {
    const cities = {
        'SP': ['São Paulo', 'Campinas', 'Santos', 'Ribeirão Preto', 'São José dos Campos'],
        'RJ': ['Rio de Janeiro', 'Niterói', 'São Gonçalo', 'Duque de Caxias'],
        'MG': ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora']
        // Add more cities as needed
    };

    const sellers = {
        'São Paulo': ['5511999999991', '5511999999992'],
        'Rio de Janeiro': ['5521999999993', '5521999999994'],           
        'Belo Horizonte': ['5531999999995'],
        'Campinas': ['5511999999996'],
        'Ribeirão Preto': ['5511999999997'],
        'São José dos Campos': ['5511999999998'],

        'default': '5500999999999'
    };

    const citySellerIndex = {};

    $('#state').on('change', function() {
        const state = $(this).val();
        const citySelect = $('#city');
        citySelect.empty().append('<option value="">Selecione uma cidade</option>');
        
        if (state && cities[state]) {
            cities[state].forEach(city => {
                citySelect.append(`<option value="${city}">${city}</option>`);
            });
            $('.form-step[data-step="2"]').show().addClass('active');
        } else {
            $('.form-step[data-step="2"]').hide().removeClass('active');
        }
    });

    function getSellerNumber(city) {
        const cityNumbers = sellers[city];
        if (!cityNumbers) return sellers.default;
        
        if (!citySellerIndex[city]) {
            citySellerIndex[city] = 0;
        } else {
            citySellerIndex[city] = (citySellerIndex[city] + 1) % cityNumbers.length;
        }
        
        return cityNumbers[citySellerIndex[city]];
    }

    $('.whatsapp-redirect-button').on('click', function() {
        const city = $('#city').val();
        const state = $('#state').val();
        
        if (!city || !state) return;
        
        const sellerNumber = getSellerNumber(city);
        const message = `Olá! Estou interessado em seus produtos/serviços. Sou de ${city}, ${state}.`;
        const whatsappUrl = `https://wa.me/${sellerNumber}?text=${encodeURIComponent(message)}`;
        
        window.location.href = whatsappUrl;
    });
});