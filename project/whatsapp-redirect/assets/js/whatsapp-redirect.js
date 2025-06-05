jQuery(document).ready(function($) {
    const cities = {
        'SP': [
            'Atibaia', 'Bom Jesus dos Perdões', 'Bragança Paulista', 'Piracaia', 'Mairiporã', 'Jarinu', 'Pinhalzinho',
            'Guarulhos', 'São Paulo', 'Tremembé', 'Taubaté', 'Pindamonhangaba', 'Quiririm', 'Roseira', 'Aparecida',
            'Guaratinguetá', 'Lorena', 'Campos do Jordão', 'Santo Antônio do Pinhal', 'São Bento do Sapucaí', 'Cruzeiro',
            'Natividade da Serra', 'São Luiz do Paraitinga', 'Ubatuba', 'Cunha', 'Potim', 'Cachoeira Paulista', 'Queluz',
            'Caraguatatuba', 'Bertioga', 'São Sebastião', 'Ilhabela', 'Juquehy', 'ABC', 'Osasco', 'Carapicuíba',
            'Taboão da Serra', 'Embu das Artes', 'Cotia', 'Vargem Grande Paulista', 'Itapevi', 'Itapecerica da Serra',
            'São Roque', 'Mairinque', 'Ibiúna', 'Barueri', 'Cajamar', 'Alphaville', 'Várzea Paulista', 'Campo Limpo Paulista',
            'Itatiba', 'Franco da Rocha', 'Francisco Morato', 'Caieiras', 'Nazaré Paulista', 'Morungaba', 'Tuiuti', 'Amparo',
            'Serra Negra', 'Socorro', 'Águas de Lindóia', 'Campinas', 'Valinhos', 'Vinhedo', 'Sumaré', 'Hortolândia', 'Jundiaí',
            'Paulínia', 'Salto', 'Monte Mor', 'Indaiatuba', 'Itu', 'Sorocaba', 'Araçoiaba da Serra', 'Salto de Pirapora',
            'Piedade', 'Cabreúva', 'Louveira', 'Jaguariúna', 'Holambra', 'Pedreira', 'Arthur Nogueira', 'Cosmópolis', 'Limeira',
            'Americana', 'Santa Bárbara d\'Oeste', 'Piracicaba', 'Rio Claro', 'Itupeva', 'São José dos Campos', 'Jacareí',
            'Santa Branca', 'Guararema', 'Igaratá', 'Mogi das Cruzes', 'Suzano', 'Salesópolis', 'Paraibuna', 'Caçapava',
            'Monteiro Lobato', 'Itaquaquecetuba', 'Jambeiro', 'Santo Antônio de Posse', 'Mogi Mirim', 'Mogi Guaçu', 'Porto Feliz',
            'Boituva', 'Tatuí', 'Tietê', 'Itapetininga', 'Engenheiro Coelho', 'Porto Ferreira', 'Pirassununga',
            'Santa Rita do Passa Quatro', 'Descalvado', 'São Simão', 'Santa Cruz das Palmeiras', 'Leme', 'Araras', 'Tambaú',
            'São Carlos', 'Itirapina', 'Analândia', 'Ibaté', 'Araraquara', 'Ribeirão Bonito', 'Dourado', 'Boa Esperança do Sul',
            'Matão', 'Guariba', 'Ribeirão Preto', 'Cravinhos', 'Jardinópolis', 'Batatais', 'Brodowski', 'Serrana', 'Jurucê',
            'Sertãozinho', 'Pontal', 'Pradópolis', 'Jaboticabal', 'Bebedouro', 'Monte Alto', 'Santa Cruz da Esperança',
            'Serra Azul', 'Rincão', 'Santa Rosa de Viterbo', 'Cajuru', 'Altinópolis', 'Orlândia', 'Nuporanga', 'Morro Agudo',
            'Viradouro', 'Franca', 'Restinga', 'Paraíso', 'Catanduva', 'Barretos'
        ],
        'MG': [
            'Sapucaí Mirim', 'Passa Quatro', 'Itamonte', 'Munhoz', 'Extrema', 'Itapeva', 'Camanducaia', 'Monte Verde', 'Cambuí',
            'Poços de Caldas', 'Bandeira do Sul', 'Botelhos', 'Cabo Verde', 'Campestre', 'Machado', 'Paraguaçu', 'Varginha',
            'Alfenas', 'Elói Mendes', 'Areado', 'Muzambinho', 'Guaxupé', 'Tapiratiba', 'Caconde', 'Divinolândia', 'Palmeiral',
            'Andradas', 'Águas da Prata', 'São João da Boa Vista', 'São Sebastião da Grama', 'São José do Rio Pardo', 'Casa Branca',
            'Aguaí', 'Estiva Gerbi', 'Mococa', 'Serrania', 'Caldas', 'Ibitiúra de Minas', 'Jacutinga', 'Espírito Santo do Pinhal',
            'Santo Antônio do Jardim', 'Albertina', 'Pouso Alegre', 'Congonhal', 'Ipuiúna', 'Senador José Bento',
            'Santa Rita de Caldas', 'Borda da Mata', 'Ouro Fino', 'Tocos do Moji', 'Inconfidentes', 'Crisólia', 'Monte Sião',
            'Estiva', 'Consolação', 'Córrego do Bom Jesus', 'Conceição dos Ouros', 'Cachoeira de Minas', 'Santa Rita do Sapucaí',
            'Paraisópolis', 'Gonçalves', 'Brazópolis', 'Piranguinho', 'Itajubá', 'Piranguçu', 'Wenceslau Braz', 'Delfim Moreira',
            'Maria da Fé', 'Silvianópolis', 'Espírito Santo do Dourado', 'São João da Mata', 'Turvolândia', 'Carvalhópolis',
            'Poço Fundo'
        ],
        'RJ': ['Paraty', 'Tarituba', 'Angra dos Reis']
    };

    const sellers = {
        // Vale do Paraíba
        'São José dos Campos': ['5512991234567', '5512997654321'],
        'Taubaté': ['5512991234567', '5512997654321'],
        'Jacareí': ['5512991234567', '5512997654321'],
        'Pindamonhangaba': ['5512991234567', '5512997654321'],
        'Guaratinguetá': ['5512991234567', '5512997654321'],
        'Lorena': ['5512991234567', '5512997654321'],
        'Cruzeiro': ['5512991234567', '5512997654321'],
        'Caçapava': ['5512991234567', '5512997654321'],
        
        // Litoral Norte
        'Caraguatatuba': ['5512992345678', '5512998765432'],
        'São Sebastião': ['5512992345678', '5512998765432'],
        'Ilhabela': ['5512992345678', '5512998765432'],
        'Ubatuba': ['5512992345678', '5512998765432'],
        
        // Região Bragantina
        'Atibaia': ['5511993456789', '5511999876543'],
        'Bragança Paulista': ['5511993456789', '5511999876543'],
        'Piracaia': ['5511993456789', '5511999876543'],
        'Mairiporã': ['5511993456789', '5511999876543'],
        
        // Grande São Paulo
        'São Paulo': ['5511994567890', '5511990987654'],
        'Guarulhos': ['5511994567890', '5511990987654'],
        'ABC': ['5511994567890', '5511990987654'],
        'Osasco': ['5511994567890', '5511990987654'],
        
        // Sul de Minas
        'Poços de Caldas': ['5535995678901', '5535991098765'],
        'Pouso Alegre': ['5535995678901', '5535991098765'],
        'Extrema': ['5535995678901', '5535991098765'],
        'Cambuí': ['5535995678901', '5535991098765'],
        
        // Litoral Sul RJ
        'Paraty': ['5524996789012', '5524992109876'],
        'Angra dos Reis': ['5524996789012', '5524992109876'],
        
        // Vendedor padrão para outras cidades
        'default': '5511999999999'
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