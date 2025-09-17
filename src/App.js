Perfekt! Nu til den store fil - Step 5:

## Step 5: Opret src/App.js

1. Klik **"Add file"** → **"Create new file"**
2. **Filnavn:** `src/App.js`
3. **Kopier og indsæt hele denne kode:**

```javascript
import React, { useState } from 'react';
import { Copy, Download, RefreshCw, Lightbulb, AlertCircle } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    input_text: '',
    tone: 'Warm',
    kampagnetype: 'Salg',
    saeson: 'Forår',
    antal_varianter: 5
  });

  const [generatedAds, setGeneratedAds] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [qualityScores, setQualityScores] = useState([]);

  const kampagnetyper = ['Salg', 'Trafik', 'Engagement', 'Brand Awareness'];
  const sæsoner = ['Forår', 'Sommer', 'Efterår', 'Vinter', 'Helligdage', 'Særlige begivenheder'];
  
  const tones = [
    { value: 'Warm', label: '🏨 Varm', desc: 'Hjemlig og imødekommende' },
    { value: 'Luxurious', label: '✨ Luksuriøs', desc: 'Eksklusiv men tilgængelig' },
    { value: 'Professional', label: '💼 Professionel', desc: 'Betænksom og tillidsfuld' },
    { value: 'Inviting', label: '🤗 Indbydende', desc: 'Personlig og åben' }
  ];

  const bannedWords = new Set([
    'revolutionerende', 'banebrydende', 'markedsledende', 'bedst i klassen', 
    'cutting-edge', 'state-of-the-art', 'utrolig', 'ekstraordinær', 
    'verdensklasse', 'fantastisk', 'sindssygt', 'crazy', 'mega'
  ]);

  const benefitVerbs = [
    'oplev', 'nyd', 'føl', 'find', 'slap af', 'læn dig tilbage', 
    'forny', 'genopfrisk', 'hyg', 'værdsæt', 'udfold', 'fordyb'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateQualityScore = (text) => {
    const hasNumber = /\b\d+(\.\d+)?%?\b/.test(text);
    const hasBenefitVerb = benefitVerbs.some(v => 
      new RegExp(`\\b${v}[a-zA-ZæøåÆØÅ]*\\b`, "i").test(text)
    );
    const hasEmotionalWord = /\b(føl|oplev|nyd|slap af|komfort|ro|harmoni)\b/i.test(text);
    const specificity = (hasNumber ? 0.4 : 0) + (hasBenefitVerb ? 0.4 : 0) + (hasEmotionalWord ? 0.2 : 0);

    const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
    const words = text.trim().split(/\s+/).length;
    const avgSentenceLength = words / Math.max(1, sentences.length);
    const brevity = avgSentenceLength <= 12 ? 1 : Math.max(0, 1 - (avgSentenceLength - 12) / 8);

    const lowerText = text.toLowerCase();
    const hasBannedWords = Array.from(bannedWords).some(word => lowerText.includes(word));
    const bannedPenalty = hasBannedWords ? 0.3 : 1.0;

    const warmWords = ['hjemlig', 'personlig', 'imødekommende', 'varme', 'omsorg', 'nærvær'];
    const hasWarmTone = warmWords.some(word => lowerText.includes(word));
    const warmBonus = hasWarmTone ? 1.2 : 1.0;

    const totalScore = (specificity * 0.35 + brevity * 0.25 + bannedPenalty * 0.2 + warmBonus * 0.2);
    
    return {
      total: Math.min(1, totalScore),
      specificity,
      brevity,
      bannedWords: hasBannedWords,
      warmTone: hasWarmTone,
      avgSentenceLength
    };
  };

  const parseAndOptimizeWithAngles = (input, tone, angle, kampagnetype, saeson) => {
    let cleanedInput = input
      .replace(/\([^)]*\)/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const stopWords = ['skal ikke nævnes', 'ikke relevant', 'ignore'];
    stopWords.forEach(stopWord => {
      cleanedInput = cleanedInput.replace(new RegExp(stopWord, 'gi'), '');
    });

    const seasonContext = {
      'Forår': {
        mood: 'fornyelse og vækst',
        activities: 'blomstrende haver og friske oplevelser',
        benefits: 'genoplivende forårsfølelse'
      },
      'Sommer': {
        mood: 'varme og livslyst',
        activities: 'solskinsoplevelser og udendørs afslapning',
        benefits: 'sommerens magi'
      },
      'Efterår': {
        mood: 'hygge og samvær',
        activities: 'gyldne farver og intim atmosfære',
        benefits: 'efterårets ro'
      },
      'Vinter': {
        mood: 'varme og nærvær',
        activities: 'hyggelige stunder og indendørs komfort',
        benefits: 'vinterens tryghed'
      },
      'Helligdage': {
        mood: 'fejring og samvær',
        activities: 'festlige traditioner og særlige øjeblikke',
        benefits: 'uforglemmelig fejring'
      },
      'Særlige begivenheder': {
        mood: 'fest og glæde',
        activities: 'personlige milepæle og celebration',
        benefits: 'perfekt fejring'
      }
    };

    const campaignFocus = {
      'Salg': {
        intent: 'booking og reservation',
        urgency: 'book nu',
        cta: 'reserver dit ophold'
      },
      'Trafik': {
        intent: 'opdagelse og interesse',
        urgency: 'se mere',
        cta: 'læs mere om oplevelsen'
      },
      'Engagement': {
        intent: 'interaktion og deling',
        urgency: 'del din oplevelse',
        cta: 'fortæl os om din drømmeweekend'
      },
      'Brand Awareness': {
        intent: 'genkendelse og opmærksomhed',
        urgency: 'oplev forskellen',
        cta: 'lær Hotel Oasia at kende'
      }
    };

    const currentSeason = seasonContext[saeson] || seasonContext['Forår'];
    const currentCampaign = campaignFocus[kampagnetype] || campaignFocus['Salg'];

    let subjectVariations = {
      singular: `${saeson.toLowerCase()}-ophold`,
      definite: `det perfekte ${saeson.toLowerCase()}-ophold`,
      context: `${currentSeason.mood}`,
      benefit: `${currentSeason.benefits}`
    };

    if (cleanedInput.toLowerCase().includes('spa') || cleanedInput.toLowerCase().includes('wellness')) {
      subjectVariations = {
        singular: `spa-ophold i ${saeson.toLowerCase()}`,
        definite: `afslappende spa i ${currentSeason.mood}`,
        context: `wellness og ${currentSeason.activities}`,
        benefit: `dyb afslapning og ${currentSeason.benefits}`
      };
    } else if (cleanedInput.toLowerCase().includes('restaurant') || cleanedInput.toLowerCase().includes('mad')) {
      subjectVariations = {
        singular: `kulinarisk ${saeson.toLowerCase()}-oplevelse`,
        definite: `gastronomiske ${saeson.toLowerCase()}-oplevelser`,
        context: `fine dining med ${currentSeason.activities}`,
        benefit: `smagfulde ${saeson.toLowerCase()}-øjeblikke`
      };
    }

    const angleTemplates = {
      'Pain': {
        starters: [
          `Træt af at ${saeson.toLowerCase()} glider forbi uden ægte afslapning?`,
          `Savner du det perfekte sted til ${currentSeason.mood}?`,
          `Føler du ikke du får nok ud af ${saeson.toLowerCase()}?`
        ],
        benefits: [
          `Hotel Oasia skaber det perfekte ${saeson.toLowerCase()}-pusterum.`,
          `${currentCampaign.cta} og oplev ${currentSeason.benefits}.`,
          `Elegant komfort møder ${currentSeason.activities}.`
        ]
      },
      'Outcome': {
        starters: [
          `Oplev ${subjectVariations.benefit} på Hotel Oasia.`,
          `Find din indre ro gennem ${subjectVariations.context}.`,
          `Forny dig selv med ${subjectVariations.definite}.`
        ],
        benefits: [
          `Hver detalje er tænkt med ${saeson.toLowerCase()} i tankerne.`,
          `${currentCampaign.cta} og mærk forskellen.`,
          `Luksuriøs komfort i ${currentSeason.mood}.`
        ]
      },
      'Proof': {
        starters: [
          `Hundredvis af gæster har fundet deres perfekte ${saeson.toLowerCase()}-ophold hos os.`,
          `Vores gæster vender tilbage sæson efter sæson.`,
          `Hotel Oasia er blevet det foretrukne ${saeson.toLowerCase()}-refugium.`
        ],
        benefits: [
          `Dokumenteret gæstfrihed i alle sæsoner.`,
          `${currentCampaign.cta} og bliv en del af familien.`,
          `Service der matcher ${currentSeason.mood} perfekt.`
        ]
      },
      'Objection': {
        starters: [
          `"For dyrt for et ${saeson.toLowerCase()}-ophold" - indtil du ser værdien.`,
          `"Ingen tid til pause" gælder ikke når ${saeson.toLowerCase()} kalder.`,
          `"Alle hoteller er ens" - selv i ${saeson.toLowerCase()}?`
        ],
        benefits: [
          `Værdi der rækker langt ud over ${saeson.toLowerCase()}-sæsonen.`,
          `${currentCampaign.cta} og prioritér dig selv.`,
          `Personlig service der gør ${saeson.toLowerCase()} uforglemmelig.`
        ]
      },
      'Urgency': {
        starters: [
          `Kun få ${saeson.toLowerCase()}-ophold tilbage i denne periode.`,
          `${saeson} bookning-vindue lukker snart.`,
          `Sidste chance for det perfekte ${saeson.toLowerCase()}-ophold.`
        ],
        benefits: [
          `${currentCampaign.cta} før det er for sent.`,
          `Sikr dig ${currentSeason.benefits} nu.`,
          `Begrænsede pladser til ${saeson.toLowerCase()}-magi.`
        ]
      }
    };

    const template = angleTemplates[angle] || angleTemplates['Outcome'];
    
    return {
      cleanedInput,
      subjectVariations,
      seasonContext: currentSeason,
      campaignFocus: currentCampaign,
      starter: template.starters[Math.floor(Math.random() * template.starters.length)],
      benefit: template.benefits[Math.floor(Math.random() * template.benefits.length)],
      angle
    };
  };

  const generateAdTexts = async () => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2500));

    if (!formData.input_text.trim()) {
      setGeneratedAds([]);
      setIsGenerating(false);
      return;
    }

    const brandContext = {
      company: 'Hotel Oasia',
      heritage: 'Elegant komfort siden åbningen',
      values: 'Gæstfrihed, kvalitet og personlig service',
      benefits: 'opmærksomhed på detaljer, hjemlig varme, eksklusiv men tilgængelig luksus',
      location: 'Dit perfekte pusterum fra hverdagen'
    };

    const angles = ['Pain', 'Outcome', 'Proof', 'Objection', 'Urgency'];
    const ads = [];
    const scores = [];

    for (let i = 0; i < formData.antal_varianter; i++) {
      const angle = angles[i] || angles[i % angles.length];
      const parsed = parseAndOptimizeWithAngles(
        formData.input_text, 
        formData.tone, 
        angle, 
        formData.kampagnetype, 
        formData.saeson
      );

      let primaryText = `${parsed.starter} ${parsed.benefit}`;
      
      const headlines = [
        `${parsed.subjectVariations.singular} - Elegant komfort`,
        `${brandContext.company} - ${parsed.seasonContext.mood}`,
        `Oplev ${parsed.seasonContext.benefits}`,
        `Dit perfekte ${formData.saeson.toLowerCase()}-pusterum`,
        `Personlig service og ${parsed.seasonContext.mood}`
      ];

      const descriptions = [
        `${brandContext.values}.`,
        `${parsed.campaignFocus.cta} i dag.`,
        `Elegant design og hjemlig varme.`,
        `Hver detalje tænkt med dig i tankerne.`,
        `${brandContext.company} - ${brandContext.location}.`
      ];

      const headline = headlines[i] || headlines[i % headlines.length];
      const description = descriptions[i] || descriptions[i % descriptions.length];

      if (primaryText.length > 125) {
        const lastSpace = primaryText.lastIndexOf(' ', 122);
        primaryText = primaryText.substring(0, lastSpace) + '...';
      }

      let finalHeadline = headline;
      if (finalHeadline.length > 40) {
        const lastSpace = finalHeadline.lastIndexOf(' ', 37);
        finalHeadline = finalHeadline.substring(0, lastSpace) + '...';
      }

      let finalDescription = description;
      if (finalDescription.length > 20) {
        const lastSpace = finalDescription.lastIndexOf(' ', 17);
        finalDescription = finalDescription.substring(0, lastSpace) + '...';
      }

      const fullText = `${primaryText} ${finalHeadline} ${finalDescription}`;
      const qualityScore = calculateQualityScore(fullText);

      ads.push({
        id: i + 1,
        primaryText,
        headline: finalHeadline,
        description: finalDescription,
        angle: angle,
        primaryTextLength: primaryText.length,
        headlineLength: finalHeadline.length,
        descriptionLength: finalDescription.length
      });

      scores.push(qualityScore);
    }

    const sortedIndices = scores
      .map((score, index) => ({ score: score.total, index }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.index);

    const sortedAds = sortedIndices.map(i => ads[i]);
    const sortedScores = sortedIndices.map(i => scores[i]);

    setGeneratedAds(sortedAds);
    setQualityScores(sortedScores);
    setIsGenerating(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const exportToCSV = () => {
    const headers = ['Variant', 'Vinkel', 'Primary Text', 'Headline', 'Description', 'Kvalitetsscore'];
    const csvContent = [
      headers.join(','),
      ...generatedAds.map((ad, idx) => [
        `Variant ${ad.id}`,
        ad.angle,
        `"${ad.primaryText}"`,
        `"${ad.headline}"`,
        `"${ad.description}"`,
        qualityScores[idx] ? qualityScores[idx].total.toFixed(2) : ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hotel-oasia-meta-ads-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const getQualityColor = (score) => {
    if (score >= 0.8) return 'text-green-600 bg-green-50';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const selectedTone = tones.find(t => t.value === formData.tone);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Hotel Oasia</h1>
          <p className="text-amber-100">Intelligent Meta Ads Generator med Kvalitetskontrol</p>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 p-6 bg-gray-50 border-r">
            <h2 className="text-xl font-semibold mb-4">Hvad handler din annonce om?</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Beskriv dit indhold, budskab eller oplevelse</label>
                <textarea
                  name="input_text"
                  value={formData.input_text}
                  onChange={handleInputChange}
                  placeholder="f.eks. Vigtigheden af at tage en pause fra hverdagen med spa og wellness"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none h-32"
                  rows={6}
                />
                <div className="text-right text-xs text-gray-500 mt-1">
                  {formData.input_text.length} / 500 tegn
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Kampagnetype</label>
                <select
                  name="kampagnetype"
                  value={formData.kampagnetype}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {kampagnetyper.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Sæson/Periode</label>
                <select
                  name="saeson"
                  value={formData.saeson}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {sæsoner.map(saeson => (
                    <option key={saeson} value={saeson}>{saeson}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tone of Voice</label>
                <select
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  {tones.map(tone => (
                    <option key={tone.value} value={tone.value}>
                      {tone.label}
                    </option>
                  ))}
                </select>
                {selectedTone && (
                  <p className="text-xs text-gray-600 mt-1">{selectedTone.desc}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Antal Varianter</label>
                <select
                  name="antal_varianter"
                  value={formData.antal_varianter}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                >
                  <option value={3}>3 varianter</option>
                  <option value={5}>5 varianter</option>
                </select>
              </div>

              <div className="bg-amber-50 p-4 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-amber-800">
                    <p className="font-medium mb-1">Automatiske Vinkler:</p>
                    <ul className="text-xs space-y-1">
                      <li>• Problem-fokuseret (Pain)</li>
                      <li>• Oplevelse-fokuseret (Outcome)</li>
                      <li>• Social bevis (Proof)</li>
                      <li>• Indvending-modgang (Objection)</li>
                      <li>• Tidsbegrænset (Urgency)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={generateAdTexts}
                disabled={isGenerating || !formData.input_text.trim()}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white p-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 flex items-center justify-center"
              >
                {isGenerating ? (
                  <RefreshCw className="animate-spin mr-2 w-5 h-5" />
                ) : null}
                {isGenerating ? 'Genererer Skarpe Meta Annoncer...' : 'Generer Skarpe Meta Annoncer'}
              </button>
            </div>
          </div>

          <div className="lg:w-2/3 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Kvalitetskontrollerede Meta Annoncer</h2>
              {generatedAds.length > 0 && (
                <button
                  onClick={exportToCSV}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Eksporter CSV
                </button>
              )}
            </div>

            {generatedAds.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Skriv dit annonce-indhold ovenfor og få kvalitetskontrollerede Meta annoncer</p>
                <p className="text-sm mt-2">Alle annoncer tilpasset Hotel Oasias tone og sæson/kampagne-fokus</p>
              </div>
            ) : (
              <div className="space-y-6">
                {generatedAds.map((ad, idx) => (
                  <div key={ad.id} className="bg-white border rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-amber-600">
                        Variant {ad.id} - {ad.angle}
                      </h3>
                      {qualityScores[idx] && (
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getQualityColor(qualityScores[idx].total)}`}>
                          Kvalitet: {(qualityScores[idx].total * 100).toFixed(0)}%
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-700">Primary Text</label>
                          <span className={`text-xs px-2 py-1 rounded ${ad.primaryTextLength <= 125 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {ad.primaryTextLength}/125 tegn
                          </span>
                        </div>
                        <div className="relative">
                          <textarea
                            value={ad.primaryText}
                            readOnly
                            className="w-full p-3 border rounded-lg bg-gray-50 resize-none"
                            rows={3}
                          />
                          <button
                            onClick={() => copyToClipboard(ad.primaryText)}
                            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-700">Headline</label>
                          <span className={`text-xs px-2 py-1 rounded ${ad.headlineLength <= 40 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {ad.headlineLength}/40 tegn
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            value={ad.headline}
                            readOnly
                            className="w-full p-3 border rounded-lg bg-gray-50"
                          />
                          <button
                            onClick={() => copyToClipboard(ad.headline)}
                            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-700">Description</label>
                          <span className={`text-xs px-2 py-1 rounded ${ad.descriptionLength <= 20 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {ad.descriptionLength}/20 tegn
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            value={ad.description}
                            readOnly
                            className="w-full p-3 border rounded-lg bg-gray-50"
                          />
                          <button
                            onClick={() => copyToClipboard(ad.description)}
                            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {qualityScores[idx] && (
                        <div className="bg-gray-50 p-3 rounded-lg mt-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Kvalitetsanalyse:</h4>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>Specificitet: {(qualityScores[idx].specificity * 100).toFixed(0)}%</div>
                            <div>Klarhed: {(qualityScores[idx].brevity * 100).toFixed(0)}%</div>
                            <div>Varm tone: {qualityScores[idx].warmTone ? 'Ja' : 'Nej'}</div>
                            <div>Bannede ord: {qualityScores[idx].bannedWords ? 'Fundet' : 'Ingen'}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-6 border-t">
          <h3 className="font-semibold mb-3">Automatisk Hotel Oasia Brand Integration og Kvalitetskontrol</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <strong>Brand Voice:</strong> Varm og professionel, personlig og imødekommende, indbydende og betænksom
            </div>
            <div>
              <strong>Sæson Integration:</strong> Automatisk tilpasning til valgte sæson med passende stemning og aktiviteter
            </div>
            <div>
              <strong>Meta Format:</strong> Primary Text (125), Headline (40), Description (20 tegn) - optimeret til Facebook/Instagram
            </div
</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
