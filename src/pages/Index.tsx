import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [diaryContent, setDiaryContent] = useState("Дорогой дневник,\n\nСегодня...");
  const [entries] = useState([
    {
      id: 1,
      title: "Первая запись в дневнике",
      content: "Сегодня начинаю вести цифровой дневник. Это место для моих мыслей, воспоминаний и важных моментов жизни...",
      date: "12 августа 2025",
      mood: "😊"
    },
    {
      id: 2,
      title: "Размышления о времени",
      content: "Время летит так быстро. Иногда хочется остановить момент и насладиться настоящим...",
      date: "11 августа 2025",
      mood: "🤔"
    }
  ]);

  const [gallery] = useState([
    { id: 1, src: "/img/28a5d467-22a8-48e2-b366-3b0abf46b158.jpg", title: "Воспоминания", date: "Август 2025" },
    { id: 2, src: "/img/84e8e7ca-e23a-4e93-b636-93f53dc83e5c.jpg", title: "Старые записи", date: "Июль 2025" }
  ]);

  const [settings, setSettings] = useState({
    theme: "vintage",
    font: "merriweather",
    autoSave: true,
    privateMode: false
  });

  const diaryRef = useRef<HTMLDivElement>(null);

  const exportToPDF = () => {
    // Простая имитация экспорта PDF
    const content = diaryContent;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diary-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia to-vintage-paper relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-30 paper-texture"></div>
      
      {/* Hidden menu trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="fixed top-4 left-4 z-50 bg-vintage-brown/20 hover:bg-vintage-brown/40 backdrop-blur-sm border border-vintage-dark/20"
          >
            <Icon name="Menu" size={20} className="text-vintage-dark" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-vintage-paper border-r-2 border-vintage-dark/30 w-80">
          <SheetHeader>
            <SheetTitle className="vintage-handwriting text-2xl text-vintage-dark">
              📖 Меню дневника
            </SheetTitle>
          </SheetHeader>
          
          <Tabs defaultValue="history" className="mt-6">
            <TabsList className="grid w-full grid-cols-3 bg-vintage-cream">
              <TabsTrigger value="history" className="text-xs">История</TabsTrigger>
              <TabsTrigger value="gallery" className="text-xs">Галерея</TabsTrigger>
              <TabsTrigger value="settings" className="text-xs">Настройки</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="mt-4 space-y-4">
              <div className="space-y-3">
                {entries.map((entry) => (
                  <Card key={entry.id} className="bg-vintage-cream/50 border border-vintage-dark/20 cursor-pointer hover:bg-vintage-cream/80 transition-colors">
                    <CardContent className="p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="vintage-handwriting text-sm text-vintage-dark font-medium">
                            {entry.title}
                          </h4>
                          <p className="text-xs text-vintage-dark/60 mt-1">{entry.date}</p>
                        </div>
                        <span className="text-lg">{entry.mood}</span>
                      </div>
                      <p className="text-xs text-vintage-dark/70 mt-2 line-clamp-2">
                        {entry.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button variant="outline" className="w-full text-xs border-vintage-dark/30">
                <Icon name="Archive" size={16} className="mr-2" />
                Архив записей
              </Button>
            </TabsContent>

            <TabsContent value="gallery" className="mt-4">
              <div className="grid grid-cols-2 gap-3">
                {gallery.map((item) => (
                  <div key={item.id} className="relative group cursor-pointer">
                    <img 
                      src={item.src} 
                      alt={item.title}
                      className="w-full h-20 object-cover rounded border border-vintage-dark/20"
                    />
                    <div className="absolute inset-0 bg-vintage-dark/0 group-hover:bg-vintage-dark/20 rounded transition-colors"></div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 text-xs border-vintage-dark/30">
                <Icon name="Upload" size={16} className="mr-2" />
                Добавить фото
              </Button>
            </TabsContent>

            <TabsContent value="settings" className="mt-4 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme" className="text-sm text-vintage-dark">Тема</Label>
                  <Select value={settings.theme} onValueChange={(theme) => setSettings({...settings, theme})}>
                    <SelectTrigger className="w-24 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vintage">Винтаж</SelectItem>
                      <SelectItem value="sepia">Сепия</SelectItem>
                      <SelectItem value="classic">Классик</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="font" className="text-sm text-vintage-dark">Шрифт</Label>
                  <Select value={settings.font} onValueChange={(font) => setSettings({...settings, font})}>
                    <SelectTrigger className="w-24 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="merriweather">Serif</SelectItem>
                      <SelectItem value="caveat">Cursive</SelectItem>
                      <SelectItem value="roboto">Sans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="autosave" className="text-sm text-vintage-dark">Автосохранение</Label>
                  <Switch 
                    id="autosave"
                    checked={settings.autoSave}
                    onCheckedChange={(autoSave) => setSettings({...settings, autoSave})}
                    className="scale-75"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="private" className="text-sm text-vintage-dark">Приватность</Label>
                  <Switch 
                    id="private"
                    checked={settings.privateMode}
                    onCheckedChange={(privateMode) => setSettings({...settings, privateMode})}
                    className="scale-75"
                  />
                </div>
              </div>

              <Button 
                onClick={exportToPDF} 
                className="w-full bg-vintage-brown hover:bg-vintage-dark text-vintage-cream text-xs h-8"
              >
                <Icon name="Download" size={14} className="mr-2" />
                Скачать PDF
              </Button>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>

      {/* Main diary content */}
      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div 
          ref={diaryRef}
          className="w-full max-w-6xl mx-auto bg-gradient-to-r from-vintage-cream via-vintage-paper to-vintage-cream 
                     shadow-2xl relative border-2 border-vintage-dark/30 rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url('/img/70ae4ed0-ae5f-44e0-b6d7-39c3a526256a.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply'
          }}
        >
          {/* Book binding in center */}
          <div className="absolute left-1/2 top-0 bottom-0 w-8 bg-vintage-dark/20 transform -translate-x-1/2 z-10 
                         border-l-2 border-r-2 border-vintage-dark/40">
            <div className="h-full w-full bg-gradient-to-b from-vintage-dark/10 to-vintage-brown/20"></div>
          </div>

          <div className="grid grid-cols-2 min-h-[80vh]">
            {/* Left page */}
            <div className="p-8 pr-12 relative bg-vintage-paper/80 backdrop-blur-sm">
              <div className="h-full flex flex-col">
                {/* Page lines */}
                <div className="absolute inset-8 right-12 pointer-events-none">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="border-b border-vintage-dark/20 mb-6 last:mb-0"
                      style={{ height: '1.5rem' }}
                    ></div>
                  ))}
                </div>
                
                {/* Red margin line */}
                <div className="absolute left-16 top-8 bottom-8 w-px bg-red-300/50"></div>
                
                {/* Date in top right */}
                <div className="text-right mb-6 vintage-handwriting text-vintage-dark/60">
                  {new Date().toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </div>

                {/* Writing area */}
                <div className="flex-1 relative z-20">
                  <Textarea
                    value={diaryContent}
                    onChange={(e) => setDiaryContent(e.target.value)}
                    placeholder="Дорогой дневник..."
                    className="w-full h-full bg-transparent border-none resize-none vintage-handwriting text-lg text-vintage-dark 
                             leading-relaxed placeholder:text-vintage-dark/40 focus:ring-0 focus:outline-none p-0 pl-8"
                    style={{ lineHeight: '2.5rem' }}
                  />
                </div>
              </div>
            </div>

            {/* Right page */}
            <div className="p-8 pl-12 relative bg-vintage-paper/80 backdrop-blur-sm">
              <div className="h-full flex flex-col">
                {/* Page lines */}
                <div className="absolute inset-8 left-12 pointer-events-none">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div 
                      key={i} 
                      className="border-b border-vintage-dark/20 mb-6 last:mb-0"
                      style={{ height: '1.5rem' }}
                    ></div>
                  ))}
                </div>
                
                {/* Red margin line */}
                <div className="absolute left-20 top-8 bottom-8 w-px bg-red-300/50"></div>
                
                {/* Additional writing space */}
                <div className="flex-1 relative z-20 pt-12">
                  <div className="vintage-handwriting text-lg text-vintage-dark/40 pl-8">
                    {/* Decorative elements or continuation space */}
                    <div className="space-y-6">
                      <div className="text-center text-vintage-dark/30">
                        ✦ ✦ ✦
                      </div>
                      <div className="text-sm text-vintage-dark/50 text-center italic">
                        "Каждая запись — это частичка души"
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom right corner - subtle tools */}
                <div className="flex justify-end items-end space-x-2 mt-6">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-vintage-dark/40 hover:text-vintage-dark/80 bg-transparent hover:bg-vintage-dark/10"
                    onClick={exportToPDF}
                  >
                    <Icon name="Download" size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-vintage-dark/40 hover:text-vintage-dark/80 bg-transparent hover:bg-vintage-dark/10"
                  >
                    <Icon name="Heart" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle shadows and wear effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-radial from-vintage-dark/10 to-transparent"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-radial from-vintage-dark/10 to-transparent"></div>
            <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-vintage-brown/5 rounded-full blur-xl"></div>
            <div className="absolute top-1/4 right-1/3 w-16 h-16 bg-vintage-brown/5 rounded-full blur-lg"></div>
          </div>
        </div>
      </div>

      {/* Auto-save indicator */}
      {settings.autoSave && (
        <div className="fixed bottom-4 right-4 bg-vintage-brown/80 text-vintage-cream text-xs px-3 py-1 rounded-full backdrop-blur-sm">
          <Icon name="CheckCircle" size={12} className="inline mr-1" />
          Автосохранено
        </div>
      )}
    </div>
  );
};

export default Index;