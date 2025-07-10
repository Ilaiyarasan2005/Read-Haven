import React, { useState, useEffect } from 'react';
import { User, BookOpen, Heart, Settings, Calendar, Trophy, Star, Library } from 'lucide-react';
import { toast } from 'sonner';
import BookCard from '../components/BookCard';
import ImageUpload from '../components/ImageUpload';
import BookUploadDialog from '../components/BookUploadDialog';
import { getProfile, updateProfile } from '../services/userService';
import { addBook, getBooks } from '../services/bookService';

const Profile = () => {
  const [activeTab, setActiveTab] = useState<'reading' | 'saved' | 'mybooks' | 'stats' | 'settings'>('reading');
  const [isEditing, setIsEditing] = useState(false);
  const [myBooks, setMyBooks] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    bio: '',
    avatar: '',
    reading_stats: {
      booksRead: 0,
      currentStreak: 0,
      totalPages: 0,
      favoriteGenre: ''
    },
    settings: {
      emailNotifications: true,
      readingReminders: true,
      publicProfile: true
    }
  });
  const [lastReadBooks, setLastReadBooks] = useState<any[]>([]);
  const [savedBooks, setSavedBooks] = useState<any[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfile();
        setUserInfo(data);
        // Mocking last read and saved books for now, ideally these would come from user data
        const allBooks = (await getBooks({})).data;
        setLastReadBooks(allBooks.slice(0, 2));
        setSavedBooks(allBooks.slice(0, 4));
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const { data } = await updateProfile(userInfo);
      setUserInfo(data);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleImageChange = (newImageUrl: string) => {
    setUserInfo({ ...userInfo, avatar: newImageUrl });
  };

  const handleBookAdd = async (newBook: any) => {
    try {
      const { data } = await addBook(newBook);
      setMyBooks([...myBooks, data]);
      toast.success('Book added successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add book');
    }
  };

  const handleSettingChange = (settingName: keyof typeof userInfo.settings, value: boolean) => {
    setUserInfo(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [settingName]: value
      }
    }));
  };

  const TabButton = ({ tab, icon: Icon, label }: { tab: string; icon: any; label: string }) => (
    <button
      onClick={() => setActiveTab(tab as any)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        activeTab === tab
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-card rounded-2xl p-8 mb-8 shadow-sm border">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar with Upload */}
            <ImageUpload 
              currentImage={userInfo.avatar}
              onImageChange={handleImageChange}
              isEditing={isEditing}
            />

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={userInfo.username}
                    onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                    className="text-2xl font-bold bg-transparent border-b border-border focus:outline-none focus:border-primary"
                  />
                  <input
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    className="text-muted-foreground bg-transparent border-b border-border focus:outline-none focus:border-primary"
                  />
                  <textarea
                    value={userInfo.bio}
                    onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
                    rows={3}
                    className="w-full text-muted-foreground bg-transparent border border-border rounded-lg p-2 focus:outline-none focus:border-primary resize-none"
                  />
                </div>
              ) : (
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{userInfo.username || "ilaiyarasan"}</h1>
                  <p className="text-muted-foreground mb-4">{userInfo.email || "user@example.com"}</p>
                  <p className="text-foreground leading-relaxed">{userInfo.bio || "I Am aHappy Reading Books"}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="border border-border px-6 py-2 rounded-lg hover:bg-muted transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center space-x-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <TabButton tab="reading" icon={BookOpen} label="Currently Reading" />
          <TabButton tab="saved" icon={Heart} label="Saved Books" />
          <TabButton tab="mybooks" icon={Library} label="My Books" />
          <TabButton tab="stats" icon={Trophy} label="Reading Stats" />
          <TabButton tab="settings" icon={Settings} label="Settings" />
        </div>

        {/* Tab Content */}
        <div className="bg-card rounded-2xl p-8 shadow-sm border">
          {activeTab === 'reading' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Continue Reading</h2>
              {lastReadBooks.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {lastReadBooks.map((book) => (
                    <BookCard key={book._id} book={book} variant="large" showDescription />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No books in progress</h3>
                  <p className="text-muted-foreground">Start reading a book to see it here!</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'saved' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Saved for Later</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedBooks.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'mybooks' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">My Books</h2>
                <BookUploadDialog onBookAdd={handleBookAdd} />
              </div>
              
              {myBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {myBooks.map((book) => (
                    <BookCard key={book._id} book={book} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Library className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No books uploaded yet</h3>
                  <p className="text-muted-foreground mb-4">Upload your own books to start building your personal library!</p>
                  <BookUploadDialog onBookAdd={handleBookAdd} />
                </div>
              )}
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Reading Statistics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-muted/50 rounded-xl">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{userInfo.reading_stats.booksRead}</div>
                  <div className="text-muted-foreground">Books Read</div>
                </div>
                <div className="text-center p-6 bg-muted/50 rounded-xl">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{userInfo.reading_stats.currentStreak}</div>
                  <div className="text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center p-6 bg-muted/50 rounded-xl">
                  <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{userInfo.reading_stats.totalPages.toLocaleString()}</div>
                  <div className="text-muted-foreground">Pages Read</div>
                </div>
                <div className="text-center p-6 bg-muted/50 rounded-xl">
                  <Star className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-lg font-bold">{userInfo.reading_stats.favoriteGenre}</div>
                  <div className="text-muted-foreground">Favorite Genre</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-xl font-bold mb-6">Account Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div>
                    <h3 className="font-semibold">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive updates about new books and reading reminders</p>
                  </div>
                  <input 
                    type="checkbox" 
                    className="w-4 h-4" 
                    checked={userInfo.settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div>
                    <h3 className="font-semibold">Reading Reminders</h3>
                    <p className="text-sm text-muted-foreground">Daily reminders to maintain your reading streak</p>
                  </div>
                  <input 
                    type="checkbox" 
                    className="w-4 h-4" 
                    checked={userInfo.settings.readingReminders}
                    onChange={(e) => handleSettingChange('readingReminders', e.target.checked)}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div>
                    <h3 className="font-semibold">Public Profile</h3>
                    <p className="text-muted-foreground">Allow others to see your reading activity</p>
                  </div>
                  <input 
                    type="checkbox" 
                    className="w-4 h-4" 
                    checked={userInfo.settings.publicProfile}
                    onChange={(e) => handleSettingChange('publicProfile', e.target.checked)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
