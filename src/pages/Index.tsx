import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [entries, setEntries] = useState([
    {
      id: 1,
      title: "Первая запись в дневнике",
      content: "Сегодня начинаю вести цифровой дневник. Это место для моих мыслей, воспоминаний и важных моментов жизни...",
      date: "12 августа 2025",
      mood: "😊",
      images: ["/img/84e8e7ca-e23a-4e93-b636-93f53dc83e5c.jpg"]
    },
    {
      id: 2,
      title: "Размышления о времени",
      content: "Время летит так быстро. Иногда хочется остановить момент и насладиться настоящим...",
      date: "11 августа 2025",
      mood: "🤔",
      images: []
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

  const [newEntry, setNewEntry] = useState({ title: "", content: "", mood: "😊" });
  const [activeTab, setActiveTab] = useState("entries");

  const addEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry = {
        id: entries.length + 1,
        ...newEntry,
        date: new Date().toLocaleDateString('ru-RU', { 
          day: 'numeric', 
          month: 'long', 
          year: 'numeric' 
        }),
        images: []
      };
      setEntries([entry, ...entries]);
      setNewEntry({ title: "", content: "", mood: "😊" });
    }
  };

  return (
    <div className="min-h-screen bg-vintage-sepia paper-texture">
      {/* Header */}
      <header className="bg-vintage-brown/90 backdrop-blur-sm border-b-2 border-vintage-dark/20 torn-edge">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-vintage-cream vintage-handwriting text-center">
            📖 Мой Дневник
          </h1>
          <p className="text-vintage-cream/80 text-center mt-2 text-lg">
            Место для твоих мыслей и воспоминаний
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-vintage-paper border-2 border-vintage-dark/30">
            <TabsTrigger value="entries" className="vintage-handwriting text-lg">
              <Icon name="BookOpen" size={20} className="mr-2" />
              Записи
            </TabsTrigger>
            <TabsTrigger value="gallery" className="vintage-handwriting text-lg">
              <Icon name="Images" size={20} className="mr-2" />
              Галерея
            </TabsTrigger>
            <TabsTrigger value="settings" className="vintage-handwriting text-lg">
              <Icon name="Settings" size={20} className="mr-2" />
              Настройки
            </TabsTrigger>
            <TabsTrigger value="archive" className="vintage-handwriting text-lg">
              <Icon name="Archive" size={20} className="mr-2" />
              Архив
            </TabsTrigger>
          </TabsList>

          {/* Записи */}
          <TabsContent value="entries" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl vintage-handwriting text-vintage-dark">Мои записи</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-vintage-brown hover:bg-vintage-dark text-vintage-cream vintage-handwriting text-lg">
                    <Icon name="Plus" size={20} className="mr-2" />
                    Новая запись
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-vintage-paper border-2 border-vintage-dark/30">
                  <DialogHeader>
                    <DialogTitle className="vintage-handwriting text-2xl text-vintage-dark">
                      Новая запись в дневнике
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Заголовок записи..."
                      value={newEntry.title}
                      onChange={(e) => setNewEntry({...newEntry, title: e.target.value})}
                      className="border-vintage-dark/30 bg-vintage-cream"
                    />
                    <Textarea
                      placeholder="Что у тебя на душе?..."
                      value={newEntry.content}
                      onChange={(e) => setNewEntry({...newEntry, content: e.target.value})}
                      rows={6}
                      className="border-vintage-dark/30 bg-vintage-cream resize-none"
                    />
                    <div className="flex items-center space-x-4">
                      <Label htmlFor="mood" className="text-vintage-dark">Настроение:</Label>
                      <Select value={newEntry.mood} onValueChange={(mood) => setNewEntry({...newEntry, mood})}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="😊">😊 Счастье</SelectItem>
                          <SelectItem value="😢">😢 Грусть</SelectItem>
                          <SelectItem value="🤔">🤔 Задумчивость</SelectItem>
                          <SelectItem value="😌">😌 Спокойствие</SelectItem>
                          <SelectItem value="🔥">🔥 Вдохновение</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={addEntry} className="w-full bg-vintage-brown hover:bg-vintage-dark text-vintage-cream">
                      Сохранить запись
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {entries.map((entry) => (
                <Card key={entry.id} className="bg-vintage-cream border-2 border-vintage-dark/20 torn-edge hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl vintage-handwriting text-vintage-dark font-semibold">
                          {entry.title}
                        </h3>
                        <p className="text-vintage-dark/60 text-sm mt-1">{entry.date}</p>
                      </div>
                      <Badge variant="outline" className="text-2xl border-none bg-transparent">
                        {entry.mood}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-vintage-dark/80 leading-relaxed mb-4">
                      {entry.content}
                    </p>
                    {entry.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {entry.images.map((img, idx) => (
                          <img 
                            key={idx} 
                            src={img} 
                            alt="Фото из записи"
                            className="w-full h-48 object-cover rounded-lg border-2 border-vintage-dark/20"
                          />
                        ))}
                      </div>
                    )}
                    <div className="flex justify-end mt-4 space-x-2">
                      <Button variant="ghost" size="sm" className="text-vintage-dark/60 hover:text-vintage-dark">
                        <Icon name="Edit" size={16} className="mr-1" />
                        Редактировать
                      </Button>
                      <Button variant="ghost" size="sm" className="text-vintage-dark/60 hover:text-vintage-dark">
                        <Icon name="Heart" size={16} className="mr-1" />
                        В избранное
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Галерея */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl vintage-handwriting text-vintage-dark">Галерея воспоминаний</h2>
              <Button className="bg-vintage-brown hover:bg-vintage-dark text-vintage-cream vintage-handwriting">
                <Icon name="Upload" size={20} className="mr-2" />
                Добавить фото
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.map((item) => (
                <Card key={item.id} className="bg-vintage-cream border-2 border-vintage-dark/20 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={item.src} 
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="vintage-handwriting text-lg text-vintage-dark font-semibold">{item.title}</h3>
                    <p className="text-vintage-dark/60 text-sm mt-1">{item.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Настройки */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-3xl vintage-handwriting text-vintage-dark">Персонализация дневника</h2>
            
            <Card className="bg-vintage-cream border-2 border-vintage-dark/20">
              <CardHeader>
                <h3 className="text-xl vintage-handwriting text-vintage-dark">Внешний вид</h3>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="theme" className="text-vintage-dark">Цветовая тема</Label>
                  <Select value={settings.theme} onValueChange={(theme) => setSettings({...settings, theme})}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vintage">🏛️ Винтажная</SelectItem>
                      <SelectItem value="sepia">📜 Сепия</SelectItem>
                      <SelectItem value="classic">📚 Классическая</SelectItem>
                      <SelectItem value="dark">🌙 Темная</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="font" className="text-vintage-dark">Шрифт</Label>
                  <Select value={settings.font} onValueChange={(font) => setSettings({...settings, font})}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="merriweather">Merriweather</SelectItem>
                      <SelectItem value="caveat">Caveat (рукописный)</SelectItem>
                      <SelectItem value="roboto">Roboto</SelectItem>
                      <SelectItem value="opensans">Open Sans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="autosave" className="text-vintage-dark">Автосохранение</Label>
                  <Switch 
                    id="autosave"
                    checked={settings.autoSave}
                    onCheckedChange={(autoSave) => setSettings({...settings, autoSave})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="private" className="text-vintage-dark">Приватный режим</Label>
                  <Switch 
                    id="private"
                    checked={settings.privateMode}
                    onCheckedChange={(privateMode) => setSettings({...settings, privateMode})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-vintage-cream border-2 border-vintage-dark/20">
              <CardHeader>
                <h3 className="text-xl vintage-handwriting text-vintage-dark">Экспорт и резервные копии</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start border-vintage-dark/30">
                  <Icon name="Download" size={20} className="mr-2" />
                  Скачать дневник как PDF
                </Button>
                <Button variant="outline" className="w-full justify-start border-vintage-dark/30">
                  <Icon name="Upload" size={20} className="mr-2" />
                  Создать резервную копию
                </Button>
                <Button variant="outline" className="w-full justify-start border-vintage-dark/30">
                  <Icon name="Share" size={20} className="mr-2" />
                  Поделиться записью
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Архив */}
          <TabsContent value="archive" className="space-y-6">
            <h2 className="text-3xl vintage-handwriting text-vintage-dark">Архив записей</h2>
            
            <div className="grid gap-4">
              <Card className="bg-vintage-paper border-2 border-vintage-dark/20">
                <CardContent className="p-6 text-center">
                  <Icon name="Archive" size={48} className="mx-auto mb-4 text-vintage-dark/40" />
                  <h3 className="text-xl vintage-handwriting text-vintage-dark mb-2">Архив пуст</h3>
                  <p className="text-vintage-dark/60">
                    Здесь будут храниться твои старые записи и удаленные заметки
                  </p>
                  <Button variant="outline" className="mt-4 border-vintage-dark/30">
                    <Icon name="Search" size={16} className="mr-2" />
                    Поиск по архиву
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-vintage-brown/50 backdrop-blur-sm border-t-2 border-vintage-dark/20 mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-vintage-cream/80 vintage-handwriting text-lg">
            ✨ Каждая запись — это частичка твоей истории ✨
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;