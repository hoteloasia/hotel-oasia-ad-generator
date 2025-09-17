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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateAdTexts = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!formData.input_text.trim()) {
      setGeneratedAds([]);
      setIsGenerating(false);
      return;
    }

    const ads = [
      {
        id: 1,
        primaryText: `Oplev ${formData.saeson.toLowerCase()}s magi på Hotel Oasia. Elegant komfort og personlig service venter dig.`,
        headline: `${formData.saeson}-ophold - Hotel Oasia`,
        description: `Book dit perfekte ophold`,
        angle: 'Outcome',
        primaryTextLength: 85,
        headlineLength: 30,
        descriptionLength: 20
      }
    ];

    setGeneratedAds(ads);
    setIsGenerating(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const selectedTone = tones.find(t => t.value === formData.tone);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Hotel Oasia</h1>
          <p className="text-amber-100">Meta Ads Generator</p>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 p-6 bg-gray-50 border-r">
            <h2 className="text-xl font-semibold mb-4">Kampagne Setup</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Beskrivelse</label>
                <textarea
                  name="input_text"
                  value={formData.input_text}
                  onChange={handleInputChange}
                  placeholder="Beskriv din annonce..."
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none h-32"
                />
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
                <label className="block text-sm font-medium mb-2">Sæson</label>
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

              <button
                onClick={generateAdTexts}
                disabled={isGenerating || !formData.input_text.trim()}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white p-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 disabled:opacity-50"
              >
                {isGenerating ? 'Genererer...' : 'Generer Annoncer'}
              </button>
            </div>
          </div>

          <div className="lg:w-2/3 p-6">
            <h2 className="text-xl font-semibold mb-6">Genererede Annoncer</h2>
            
            {generatedAds.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>Skriv din beskrivelse og klik "Generer Annoncer"</p>
              </div>
            ) : (
              <div className="space-y-6">
                {generatedAds.map((ad) => (
                  <div key={ad.id} className="bg-white border rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-amber-600 mb-4">
                      Variant {ad.id} - {ad.angle}
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-sm font-medium text-gray-700">Primary Text</label>
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
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
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
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
                          <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
