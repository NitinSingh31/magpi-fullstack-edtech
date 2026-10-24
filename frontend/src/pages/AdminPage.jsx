import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  Calendar,
  Shield, 
  Search, 
  Download, 
  Lock, 
  Unlock, 
  KeyRound, 
  Inbox, 
  ArrowLeft,
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  X,
  MapPin,
  DollarSign,
  Layers,
  Sparkles,
  Users,
  FileText,
  AlertCircle,
  Image,
  UploadCloud,
  Check,
  RotateCcw,
  GraduationCap,
  MessageSquareQuote,
  Star
} from 'lucide-react';
import './AdminPage.css';
import api from '../services/api.js';
import { useSiteMedia } from '../context/MediaContext';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(
      (sessionStorage.getItem('magpi_admin_auth') === 'true' && sessionStorage.getItem('magpi_admin_token')) ||
      (localStorage.getItem('magpi_admin_auth') === 'true' && localStorage.getItem('magpi_admin_token'))
    );
  });

  // Login Form States (Matching Management Portal Layout)
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showLostPassword, setShowLostPassword] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'inquiries' | 'careers' | 'applications' | 'media'
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Media Manager Integration
  const { mediaItems, updateMedia, resetMedia, refreshMedia } = useSiteMedia();
  const [mediaSectionFilter, setMediaSectionFilter] = useState('all');
  const [uploadingMediaKey, setUploadingMediaKey] = useState(null);
  const [mediaUrlInputs, setMediaUrlInputs] = useState({});
  const [mediaToast, setMediaToast] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [careers, setCareers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);

  // Career Modal State
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    type: 'Part-time / Full-time Remote',
    location: 'Global (Remote)',
    compensation: '$35 - $65 / hr',
    boards: '',
    requirements: '',
    isActive: true
  });
  const [savingJob, setSavingJob] = useState(false);

  // Academic Leadership Modal State
  const [isLeaderModalOpen, setIsLeaderModalOpen] = useState(false);
  const [editingLeader, setEditingLeader] = useState(null);
  const [leaderFormData, setLeaderFormData] = useState({
    name: '',
    role: '',
    credentials: '',
    subjects: '',
    image: '',
    isActive: true,
    order: 0
  });
  const [savingLeader, setSavingLeader] = useState(false);
  const [uploadingLeaderImg, setUploadingLeaderImg] = useState(false);

  // Testimonials / Reviews Modal State
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [testimonialFormData, setTestimonialFormData] = useState({
    author: '',
    role: '',
    quote: '',
    rating: 5,
    isActive: true,
    order: 0
  });
  const [savingTestimonial, setSavingTestimonial] = useState(false);

  // Change Password Modal State
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordModalError, setPasswordModalError] = useState('');
  const [passwordModalSuccess, setPasswordModalSuccess] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const generateCaptcha = () => {
    const d1 = Math.floor(Math.random() * 9) + 1;
    const d2 = Math.floor(Math.random() * 10);
    const d3 = Math.floor(Math.random() * 10);
    setCaptchaCode(`${d1}${d2}${d3}`);
    setCaptchaInput('');
  };

  const fetchData = async () => {
    const token = sessionStorage.getItem('magpi_admin_token') || localStorage.getItem('magpi_admin_token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    setLoading(true);
    try {
      const [bookingsRes, inquiriesRes, careersRes, applicationsRes, leadershipRes, testimonialsRes] = await Promise.allSettled([
        api.getBookings(),
        api.getInquiries(),
        api.getCareerOpenings(),
        api.getFacultyApplications(),
        api.getLeadership(),
        api.getTestimonials()
      ]);

      if (bookingsRes.status === 'fulfilled' && bookingsRes.value?.success) {
        setBookings(bookingsRes.value.data || []);
      }

      if (inquiriesRes.status === 'fulfilled' && inquiriesRes.value?.success) {
        setInquiries(inquiriesRes.value.data || []);
      }

      if (careersRes.status === 'fulfilled' && careersRes.value?.success) {
        setCareers(careersRes.value.data || []);
      }

      if (applicationsRes.status === 'fulfilled' && applicationsRes.value?.success) {
        setApplications(applicationsRes.value.data || []);
      }

      if (leadershipRes.status === 'fulfilled' && leadershipRes.value?.success) {
        setLeadership(leadershipRes.value.data || []);
      }

      if (testimonialsRes.status === 'fulfilled' && testimonialsRes.value?.success) {
        setTestimonials(testimonialsRes.value.data || []);
      }

      // Refresh dynamic media slots
      if (typeof refreshMedia === 'function') {
        refreshMedia();
      }
    } catch (err) {
      console.warn('Backend not reachable:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    generateCaptcha();
    const token = sessionStorage.getItem('magpi_admin_token') || localStorage.getItem('magpi_admin_token');
    if (token) {
      api.verifyAdminSession()
        .then(() => {
          setIsAuthenticated(true);
          fetchData();
        })
        .catch(() => {
          setIsAuthenticated(false);
          sessionStorage.removeItem('magpi_admin_token');
          sessionStorage.removeItem('magpi_admin_auth');
          localStorage.removeItem('magpi_admin_token');
          localStorage.removeItem('magpi_admin_auth');
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setLoginError('Please enter your password.');
      return;
    }

    if (captchaInput.trim() !== captchaCode) {
      setLoginError('Security verification code does not match. Please try again.');
      generateCaptcha();
      return;
    }

    setIsAuthenticating(true);
    setLoginError('');

    try {
      const res = await api.loginAdmin({
        username: username.trim(),
        password: password.trim(),
        rememberMe
      });

      if (res.success && res.token) {
        if (rememberMe) {
          localStorage.setItem('magpi_admin_token', res.token);
          localStorage.setItem('magpi_admin_auth', 'true');
        } else {
          sessionStorage.setItem('magpi_admin_token', res.token);
          sessionStorage.setItem('magpi_admin_auth', 'true');
        }
        setIsAuthenticated(true);
        setPassword('');
        setCaptchaInput('');
        setLoginError('');
      } else {
        setLoginError(res.error || 'Invalid username or password.');
        generateCaptcha();
      }
    } catch (err) {
      setLoginError(err.message || 'Authentication failed. Please verify credentials.');
      generateCaptcha();
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('magpi_admin_token');
    sessionStorage.removeItem('magpi_admin_auth');
    localStorage.removeItem('magpi_admin_token');
    localStorage.removeItem('magpi_admin_auth');
    setPassword('');
    generateCaptcha();
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordModalError('');
    setPasswordModalSuccess('');

    const { currentPassword, newPassword, confirmPassword } = passwordFormData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordModalError('All password fields are required.');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordModalError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordModalError('New password and confirmation password do not match.');
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordModalError('New password must be different from your current password.');
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await api.changePassword(currentPassword, newPassword);
      if (res.success) {
        setPasswordModalSuccess('Security passkey updated successfully!');
        setPasswordFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setTimeout(() => {
          setIsPasswordModalOpen(false);
          setPasswordModalSuccess('');
        }, 2000);
      } else {
        setPasswordModalError(res.error || 'Failed to update passkey.');
      }
    } catch (err) {
      setPasswordModalError(err.message || 'Failed to update security passkey.');
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.updateBookingStatus(id, { status: newStatus });
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: newStatus } : b));
    } catch (err) {
      console.error('Failed to update booking status:', err);
      alert('Could not update status. Please ensure your backend is reachable.');
    }
  };

  const handleApplicationStatusChange = async (id, newStatus) => {
    try {
      await api.updateFacultyApplicationStatus(id, newStatus);
      setApplications(prev => prev.map(a => a._id === id ? { ...a, status: newStatus } : a));
    } catch (err) {
      alert('Failed to update application status: ' + err.message);
    }
  };

  // --- Career Openings Actions ---
  const handleOpenAddJob = () => {
    setEditingJob(null);
    setJobFormData({
      title: '',
      type: 'Part-time / Full-time Remote',
      location: 'Global (Remote)',
      compensation: '$35 - $65 / hr',
      boards: '',
      requirements: '',
      isActive: true
    });
    setIsJobModalOpen(true);
  };

  const handleOpenEditJob = (job) => {
    setEditingJob(job);
    setJobFormData({
      title: job.title || '',
      type: job.type || 'Part-time / Full-time Remote',
      location: job.location || 'Global (Remote)',
      compensation: job.compensation || '$35 - $65 / hr',
      boards: job.boards || '',
      requirements: job.requirements || '',
      isActive: job.isActive !== false
    });
    setIsJobModalOpen(true);
  };

  const handleSaveJob = async (e) => {
    e.preventDefault();
    if (!jobFormData.title.trim()) {
      alert('Please provide a job title.');
      return;
    }
    setSavingJob(true);
    try {
      if (editingJob) {
        const res = await api.updateCareerOpening(editingJob._id, jobFormData);
        if (res.success && res.data) {
          setCareers(prev => prev.map(c => c._id === editingJob._id ? res.data : c));
        }
      } else {
        const res = await api.createCareerOpening(jobFormData);
        if (res.success && res.data) {
          setCareers(prev => [res.data, ...prev]);
        }
      }
      setIsJobModalOpen(false);
    } catch (err) {
      alert('Failed to save opening: ' + (err.message || 'Unknown error'));
    } finally {
      setSavingJob(false);
    }
  };

  const handleToggleJobStatus = async (job) => {
    const updatedStatus = !job.isActive;
    try {
      const res = await api.updateCareerOpening(job._id, { isActive: updatedStatus });
      if (res.success) {
        setCareers(prev => prev.map(c => c._id === job._id ? { ...c, isActive: updatedStatus } : c));
      }
    } catch (err) {
      alert('Failed to update opening status: ' + err.message);
    }
  };

  const handleDeleteJob = async (job) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${job.title}"?`)) {
      return;
    }
    try {
      const res = await api.deleteCareerOpening(job._id);
      if (res.success) {
        setCareers(prev => prev.filter(c => c._id !== job._id));
      }
    } catch (err) {
      alert('Failed to delete opening: ' + err.message);
    }
  };

  // --- Academic Leadership Handlers ---
  const handleOpenAddLeader = () => {
    setEditingLeader(null);
    setLeaderFormData({
      name: '',
      role: '',
      credentials: '',
      subjects: '',
      image: '',
      isActive: true,
      order: leadership.length + 1
    });
    setIsLeaderModalOpen(true);
  };

  const handleOpenEditLeader = (leader) => {
    setEditingLeader(leader);
    setLeaderFormData({
      name: leader.name || '',
      role: leader.role || '',
      credentials: leader.credentials || '',
      subjects: leader.subjects || '',
      image: leader.image || '',
      isActive: leader.isActive !== false,
      order: leader.order !== undefined ? leader.order : 0
    });
    setIsLeaderModalOpen(true);
  };

  const handleSaveLeader = async (e) => {
    e.preventDefault();
    if (!leaderFormData.name.trim()) {
      alert('Leader name is required.');
      return;
    }
    if (!leaderFormData.role.trim()) {
      alert('Role / Designation is required.');
      return;
    }

    setSavingLeader(true);
    try {
      if (editingLeader) {
        const res = await api.updateLeadership(editingLeader._id, leaderFormData);
        if (res.success) {
          setLeadership(prev => prev.map(l => l._id === editingLeader._id ? res.data : l));
          setIsLeaderModalOpen(false);
        }
      } else {
        const res = await api.createLeadership(leaderFormData);
        if (res.success) {
          setLeadership(prev => [...prev, res.data]);
          setIsLeaderModalOpen(false);
        }
      }
    } catch (err) {
      alert('Failed to save leader: ' + err.message);
    } finally {
      setSavingLeader(false);
    }
  };

  const handleToggleLeaderStatus = async (leader) => {
    const updatedStatus = !leader.isActive;
    try {
      const res = await api.updateLeadership(leader._id, { isActive: updatedStatus });
      if (res.success) {
        setLeadership(prev => prev.map(l => l._id === leader._id ? { ...l, isActive: updatedStatus } : l));
      }
    } catch (err) {
      alert('Failed to update leader visibility: ' + err.message);
    }
  };

  const handleDeleteLeader = async (leader) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${leader.name}" from Academic Leadership?`)) {
      return;
    }
    try {
      const res = await api.deleteLeadership(leader._id);
      if (res.success) {
        setLeadership(prev => prev.filter(l => l._id !== leader._id));
      }
    } catch (err) {
      alert('Failed to delete leader: ' + err.message);
    }
  };

  // --- Testimonials / Reviews Handlers ---
  const handleOpenAddTestimonial = () => {
    setEditingTestimonial(null);
    setTestimonialFormData({
      author: '',
      role: '',
      quote: '',
      rating: 5,
      isActive: true,
      order: testimonials.length + 1
    });
    setIsTestimonialModalOpen(true);
  };

  const handleOpenEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialFormData({
      author: testimonial.author || '',
      role: testimonial.role || '',
      quote: testimonial.quote || '',
      rating: testimonial.rating !== undefined ? testimonial.rating : 5,
      isActive: testimonial.isActive !== false,
      order: testimonial.order !== undefined ? testimonial.order : 0
    });
    setIsTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    if (!testimonialFormData.author.trim()) {
      alert('Author name is required.');
      return;
    }
    if (!testimonialFormData.role.trim()) {
      alert('Role or parent description is required (e.g. Parent of Sarah Javed).');
      return;
    }
    if (!testimonialFormData.quote.trim()) {
      alert('Review quote text is required.');
      return;
    }

    setSavingTestimonial(true);
    try {
      if (editingTestimonial) {
        const res = await api.updateTestimonial(editingTestimonial._id, testimonialFormData);
        if (res.success) {
          setTestimonials(prev => prev.map(t => t._id === editingTestimonial._id ? res.data : t));
          setIsTestimonialModalOpen(false);
        }
      } else {
        const res = await api.createTestimonial(testimonialFormData);
        if (res.success) {
          setTestimonials(prev => [...prev, res.data]);
          setIsTestimonialModalOpen(false);
        }
      }
    } catch (err) {
      alert('Failed to save testimonial: ' + err.message);
    } finally {
      setSavingTestimonial(false);
    }
  };

  const handleToggleTestimonialStatus = async (testimonial) => {
    const updatedStatus = !testimonial.isActive;
    try {
      const res = await api.updateTestimonial(testimonial._id, { isActive: updatedStatus });
      if (res.success) {
        setTestimonials(prev => prev.map(t => t._id === testimonial._id ? { ...t, isActive: updatedStatus } : t));
      }
    } catch (err) {
      alert('Failed to update review visibility: ' + err.message);
    }
  };

  const handleDeleteTestimonial = async (testimonial) => {
    if (!window.confirm(`Are you sure you want to delete review from "${testimonial.author}"?`)) {
      return;
    }
    try {
      const res = await api.deleteTestimonial(testimonial._id);
      if (res.success) {
        setTestimonials(prev => prev.filter(t => t._id !== testimonial._id));
      }
    } catch (err) {
      alert('Failed to delete review: ' + err.message);
    }
  };

  const handleLeaderImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (PNG, JPG, WebP).');
      return;
    }
    setUploadingLeaderImg(true);
    compressImage(file)
      .then(compressedUrl => {
        setLeaderFormData(prev => ({ ...prev, image: compressedUrl }));
      })
      .catch(err => {
        alert('Failed to process image: ' + err.message);
      })
      .finally(() => {
        setUploadingLeaderImg(false);
      });
  };

  const exportLeadsToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    if (activeTab === 'bookings') {
      csvContent += "Reference,Parent Name,Phone,Email,Curriculum,Grade,Subject,Preferred Date,Time,Tutor Preference,Status,Booking Date\n";
      bookings.forEach(b => {
        csvContent += `"${b.referenceCode || ''}","${b.parentName || ''}","${b.phone || ''}","${b.email || ''}","${b.curriculum || ''}","${b.grade || ''}","${b.subject || ''}","${b.preferredDate || ''}","${b.preferredTime || ''}","${b.tutorPreference || ''}","${b.status || 'Pending'}","${b.createdAt ? new Date(b.createdAt).toISOString() : ''}"\n`;
      });
    } else if (activeTab === 'inquiries') {
      csvContent += "Name,Phone,Email,Topic/Course,Message,Type,Date\n";
      inquiries.forEach(i => {
        csvContent += `"${i.name || ''}","${i.phone || ''}","${i.email || ''}","${i.course || ''}","${(i.message || '').replace(/"/g, '""')}","${i.type || 'contact'}","${i.createdAt ? new Date(i.createdAt).toISOString() : ''}"\n`;
      });
    } else if (activeTab === 'careers') {
      csvContent += "Title,Type,Location,Compensation,Boards,Requirements,Status,Date\n";
      careers.forEach(c => {
        csvContent += `"${c.title || ''}","${c.type || ''}","${c.location || ''}","${c.compensation || ''}","${c.boards || ''}","${(c.requirements || '').replace(/"/g, '""')}","${c.isActive !== false ? 'Active' : 'Paused'}","${c.createdAt ? new Date(c.createdAt).toISOString() : ''}"\n`;
      });
    } else if (activeTab === 'applications') {
      csvContent += "Candidate Name,Email,Phone,Role Applied,Experience,Qualification,Subject,LinkedIn,Resume File,Status,Date\n";
      applications.forEach(a => {
        csvContent += `"${a.name || ''}","${a.email || ''}","${a.phone || ''}","${a.role || ''}","${a.experience || ''}","${a.qualification || ''}","${a.subject || ''}","${a.linkedin || ''}","${a.resume?.fileName || 'None'}","${a.status || 'New'}","${a.createdAt ? new Date(a.createdAt).toISOString() : ''}"\n`;
      });
    } else if (activeTab === 'leadership') {
      csvContent += "Name,Role,Credentials,Subjects,Order,Status,Image URL\n";
      leadership.forEach(l => {
        csvContent += `"${l.name || ''}","${l.role || ''}","${(l.credentials || '').replace(/"/g, '""')}","${(l.subjects || '').replace(/"/g, '""')}","${l.order || 0}","${l.isActive !== false ? 'Visible' : 'Hidden'}","${l.image || ''}"\n`;
      });
    } else if (activeTab === 'testimonials') {
      csvContent += "Author,Role/Relationship,Quote,Rating,Order,Status,Date\n";
      testimonials.forEach(t => {
        csvContent += `"${t.author || ''}","${t.role || ''}","${(t.quote || '').replace(/"/g, '""')}","${t.rating || 5}","${t.order || 0}","${t.isActive !== false ? 'Visible' : 'Hidden'}","${t.createdAt ? new Date(t.createdAt).toISOString() : ''}"\n`;
      });
    } else if (activeTab === 'media') {
      csvContent += "Key,Label,Section,Status,Active URL,Last Updated\n";
      mediaItems.forEach(m => {
        csvContent += `"${m.key}","${m.label}","${m.section}","${m.isCustom ? 'Custom Upload' : 'Default'}","${m.activeUrl}","${m.updatedAt ? new Date(m.updatedAt).toISOString() : ''}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `magpi_${activeTab}_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      b.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone?.includes(searchTerm) ||
      b.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.curriculum?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.referenceCode?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || (b.status || 'Pending').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Filter Inquiries
  const filteredInquiries = inquiries.filter(i => 
    i.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.phone?.includes(searchTerm) ||
    i.course?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter Careers
  const filteredCareers = careers.filter(c =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.boards?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.requirements?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter Applications
  const filteredApplications = applications.filter(a =>
    a.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.phone?.includes(searchTerm) ||
    a.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.qualification?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.notes?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter Academic Leadership
  const filteredLeadership = leadership.filter(l =>
    !searchTerm.trim() ||
    l.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.credentials?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.subjects?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter Testimonials / Reviews
  const filteredTestimonials = testimonials.filter(t =>
    !searchTerm.trim() ||
    t.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.quote?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter Media Slots
  const filteredMedia = mediaItems.filter(m => {
    const matchesSection = mediaSectionFilter === 'all' || m.section === mediaSectionFilter;
    const matchesSearch = !searchTerm || 
      m.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.key?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.section?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSection && matchesSearch;
  });

  const showMediaToast = (type, message) => {
    setMediaToast({ type, message });
    setTimeout(() => setMediaToast(null), 4000);
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        if (file.type === 'image/svg+xml' || file.size < 120000) {
          return resolve(event.target.result);
        }
        const img = new window.Image();
        img.src = event.target.result;
        img.onload = () => {
          const maxDim = 1600;
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
          resolve(canvas.toDataURL(mime, 0.88));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleFileUpload = async (slotKey, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showMediaToast('error', 'Please select a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      showMediaToast('error', 'Image file is too large. Please select an image under 12MB.');
      return;
    }

    setUploadingMediaKey(slotKey);
    try {
      const compressedDataUrl = await compressImage(file);
      await updateMedia(slotKey, compressedDataUrl);
      showMediaToast('success', 'Image published successfully! Live across the website now.');
    } catch (err) {
      showMediaToast('error', 'Failed to publish image: ' + err.message);
    } finally {
      setUploadingMediaKey(null);
      e.target.value = '';
    }
  };

  const handleUrlSave = async (slotKey) => {
    const url = (mediaUrlInputs[slotKey] || '').trim();
    if (!url) {
      showMediaToast('error', 'Please enter a valid image web URL.');
      return;
    }
    setUploadingMediaKey(slotKey);
    try {
      await updateMedia(slotKey, url);
      showMediaToast('success', 'Image URL saved! Live across the website now.');
      setMediaUrlInputs(prev => ({ ...prev, [slotKey]: '' }));
    } catch (err) {
      showMediaToast('error', 'Failed to save image URL: ' + err.message);
    } finally {
      setUploadingMediaKey(null);
    }
  };

  const handleResetMedia = async (slot) => {
    if (!window.confirm(`Reset "${slot.label}" back to original default image?`)) {
      return;
    }
    setUploadingMediaKey(slot.key);
    try {
      await resetMedia(slot.key);
      showMediaToast('success', `"${slot.label}" reset to default system asset.`);
    } catch (err) {
      showMediaToast('error', 'Failed to reset image: ' + err.message);
    } finally {
      setUploadingMediaKey(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-auth-viewport">
        {/* Top Management Portal Header */}
        <header className="admin-auth-header">
          <div className="admin-auth-brand-gold">MAGπ EDUCATION</div>
          <div className="admin-auth-sub-brand">MANAGEMENT PORTAL</div>
        </header>

        {/* Auth Sign In Card */}
        <div className="admin-auth-card">
          <div className="admin-auth-card-head">
            <h2>Sign In</h2>
            <p>Authorized administrators &amp; recruiters</p>
          </div>

          {loginError && (
            <div className="admin-auth-error-banner">
              <AlertCircle size={15} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="admin-auth-form">
            <div className="auth-form-group">
              <label htmlFor="admin-username">Username or Email Address</label>
              <input
                id="admin-username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setLoginError('');
                }}
                disabled={isAuthenticating}
                autoFocus
              />
            </div>

            <div className="auth-form-group">
              <label htmlFor="admin-password">Password</label>
              <div className="auth-password-wrapper">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError('');
                  }}
                  disabled={isAuthenticating}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-eye-btn"
                  title={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="auth-form-group">
              <div className="auth-captcha-header">
                <label>Security Verification Code</label>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="auth-captcha-refresh"
                >
                  <RefreshCw size={12} className={isAuthenticating ? 'spinning-icon' : ''} />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="auth-captcha-display" aria-label="Verification Code">
                {captchaCode.split('').join('   ')}
              </div>

              <label htmlFor="admin-captcha" className="auth-sub-label">Enter the code above</label>
              <input
                id="admin-captcha"
                type="text"
                placeholder="Type the 3-digit code"
                maxLength={4}
                value={captchaInput}
                onChange={(e) => {
                  setCaptchaInput(e.target.value);
                  setLoginError('');
                }}
                disabled={isAuthenticating}
              />
            </div>

            <div className="auth-card-footer-row">
              <label className="auth-remember-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isAuthenticating}
                />
                <span>Remember Me</span>
              </label>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isAuthenticating || !password.trim() || !captchaInput.trim()}
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCw size={14} className="spinning-icon" /> Logging In...
                  </>
                ) : (
                  'Log In'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Helper Links */}
        <div className="admin-auth-links">
          <button
            type="button"
            onClick={() => setShowLostPassword(true)}
            className="auth-lost-link"
          >
            Lost your password?
          </button>

          <Link to="/" className="auth-return-link">
            &larr; Return to Magπ Education
          </Link>
        </div>

        {/* Lost Password Modal Dialog */}
        {showLostPassword && (
          <div className="auth-modal-overlay" onClick={() => setShowLostPassword(false)}>
            <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="auth-modal-header">
                <h3>Admin Credentials Recovery</h3>
                <button onClick={() => setShowLostPassword(false)} className="auth-modal-close">
                  <X size={18} />
                </button>
              </div>
              <div className="auth-modal-body">
                <p>For high-grade enterprise security, master credentials are securely configured on the server environment.</p>
                <div className="auth-modal-instruction">
                  <p><strong>To update or recover your credentials:</strong></p>
                  <ol>
                    <li>Access your hosting server environment (e.g., Render, Railway, or local <code>backend/.env</code>).</li>
                    <li>Update the <code>ADMIN_USERNAME</code> and <code>ADMIN_PASSWORD</code> variables.</li>
                    <li>Restart the backend service to apply changes immediately.</li>
                  </ol>
                  <p className="auth-modal-sub">Need assistance? Reach out directly to your technical admin team at <code>contact@magpiedu.com</code>.</p>
                </div>
              </div>
              <div className="auth-modal-footer">
                <button onClick={() => setShowLostPassword(false)} className="btn-modal-primary">
                  Got It
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      {/* Top Dedicated Admin Navigation Bar */}
      <header className="admin-page-navbar">
        <div className="admin-navbar-left">
          <Link to="/" className="btn-admin-nav" title="Return to public site">
            <ArrowLeft size={16} /> <span>Back to Website</span>
          </Link>
          <img src="/assets/magpi-logo.png" alt="Magπ" className="admin-page-logo" />
          <div className="admin-navbar-title">
            <h1>Magπ Administration & Leads CRM</h1>
            <span>Protected Management Portal</span>
          </div>
        </div>

        <div className="admin-navbar-right">
          <button onClick={exportLeadsToCSV} className="btn-admin-nav" title="Export CSV">
            <Download size={15} /> <span>Export CSV</span>
          </button>
          <button onClick={fetchData} className="btn-admin-nav" title="Refresh records">
            <RefreshCw size={15} className={loading ? 'spinning-icon' : ''} /> <span>Refresh</span>
          </button>
          <button 
            onClick={() => {
              setPasswordModalError('');
              setPasswordModalSuccess('');
              setPasswordFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
              setIsPasswordModalOpen(true);
            }} 
            className="btn-admin-nav btn-pw-nav" 
            title="Change Admin Security Passkey"
          >
            <KeyRound size={15} /> <span>Change Password</span>
          </button>
          <button onClick={handleLogout} className="btn-admin-nav logout-btn" title="Log out">
            <Lock size={15} /> <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Logged-In Dashboard */}
      <main className="admin-page-main">
          <div className="admin-card-surface">
            {/* Control Strip & Tabs */}
            <div className="admin-control-strip">
              <div className="admin-nav-tabs">
                <button 
                  className={`tab-pill-btn ${activeTab === 'bookings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bookings')}
                >
                  <Calendar size={16} />
                  <span>Trial Bookings</span>
                  <span className="tab-badge">{bookings.length}</span>
                </button>
                <button 
                  className={`tab-pill-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
                  onClick={() => setActiveTab('inquiries')}
                >
                  <Inbox size={16} />
                  <span>Inquiries & Messages</span>
                  <span className="tab-badge">{inquiries.length}</span>
                </button>
                <button 
                  className={`tab-pill-btn ${activeTab === 'careers' ? 'active' : ''}`}
                  onClick={() => setActiveTab('careers')}
                >
                  <Briefcase size={16} />
                  <span>Career Openings</span>
                  <span className="tab-badge">{careers.length}</span>
                </button>
                <button 
                  className={`tab-pill-btn ${activeTab === 'applications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('applications')}
                >
                  <Users size={16} />
                  <span>Faculty Applications</span>
                  <span className="tab-badge">{applications.length}</span>
                </button>
                <button 
                  className={`tab-pill-btn ${activeTab === 'media' ? 'active' : ''}`}
                  onClick={() => setActiveTab('media')}
                >
                  <Image size={16} />
                  <span>Media & Banners</span>
                  <span className="tab-badge">
                    {mediaItems.filter(m => m.isCustom).length > 0 
                      ? `${mediaItems.filter(m => m.isCustom).length} Custom` 
                      : mediaItems.length}
                  </span>
                </button>
                <button 
                  className={`tab-pill-btn ${activeTab === 'leadership' ? 'active' : ''}`}
                  onClick={() => setActiveTab('leadership')}
                >
                  <GraduationCap size={16} />
                  <span>Academic Leadership</span>
                  <span className="tab-badge">{leadership.length}</span>
                </button>
                <button 
                  className={`tab-pill-btn ${activeTab === 'testimonials' ? 'active' : ''}`}
                  onClick={() => setActiveTab('testimonials')}
                >
                  <MessageSquareQuote size={16} />
                  <span>Parent Reviews</span>
                  <span className="tab-badge">{testimonials.length}</span>
                </button>
              </div>

              {activeTab === 'bookings' && (
                <div className="status-pills-row">
                  {['all', 'pending', 'contacted', 'confirmed', 'completed'].map(st => (
                    <button
                      key={st}
                      className={`status-pill-opt ${statusFilter === st ? 'active' : ''}`}
                      onClick={() => setStatusFilter(st)}
                    >
                      {st.charAt(0).toUpperCase() + st.slice(1)}
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'media' && (
                <div className="status-pills-row">
                  {['all', 'General & Branding', 'Home Page', 'Skill Courses'].map(sec => (
                    <button
                      key={sec}
                      className={`status-pill-opt ${mediaSectionFilter === sec ? 'active' : ''}`}
                      onClick={() => setMediaSectionFilter(sec)}
                    >
                      {sec === 'all' ? 'All Sections' : sec}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Toolbar & Action Strip */}
            <div className="admin-search-strip">
              <div className="admin-search-wrapper">
                <Search size={16} className="search-icon-svg" />
                <input 
                  type="text"
                  placeholder={
                    activeTab === 'bookings' 
                      ? "Search parent, subject, curriculum, phone, ref code..." 
                      : activeTab === 'inquiries' 
                        ? "Search by name, email, phone, message..." 
                        : activeTab === 'careers'
                          ? "Search job openings by title, curriculum, location..."
                          : activeTab === 'applications'
                            ? "Search candidate name, email, phone, role, subjects, qualifications..."
                            : activeTab === 'leadership'
                              ? "Search leaders by name, designation, credentials, subjects..."
                              : activeTab === 'testimonials'
                                ? "Search reviews by parent name, role, quote content..."
                                : "Search media slots by title, section, key..."
                  }
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="admin-search-input"
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="admin-record-counter">
                  Showing: <strong>
                    {activeTab === 'bookings' 
                      ? filteredBookings.length 
                      : activeTab === 'inquiries' 
                        ? filteredInquiries.length 
                        : activeTab === 'careers'
                          ? filteredCareers.length
                          : activeTab === 'applications'
                            ? filteredApplications.length
                            : activeTab === 'leadership'
                              ? filteredLeadership.length
                              : activeTab === 'testimonials'
                                ? filteredTestimonials.length
                                : filteredMedia.length}
                  </strong> records
                </div>

                {activeTab === 'careers' && (
                  <button onClick={handleOpenAddJob} className="btn-add-opening">
                    <Plus size={16} /> <span>Add New Opening</span>
                  </button>
                )}

                {activeTab === 'leadership' && (
                  <button onClick={handleOpenAddLeader} className="btn-add-opening">
                    <Plus size={16} /> <span>Add New Leader</span>
                  </button>
                )}

                {activeTab === 'testimonials' && (
                  <button onClick={handleOpenAddTestimonial} className="btn-add-opening">
                    <Plus size={16} /> <span>Add New Review</span>
                  </button>
                )}
              </div>
            </div>

            {/* Records Deck */}
            <div className="admin-records-viewport">
              {loading ? (
                <div className="admin-state-view">
                  <RefreshCw size={28} className="spinning-icon" />
                  <p>Fetching records from storage...</p>
                </div>
              ) : activeTab === 'bookings' ? (
                filteredBookings.length === 0 ? (
                  <div className="admin-state-view">
                    <p>No trial bookings found matching your search/filter.</p>
                  </div>
                ) : (
                  <div className="lead-cards-deck">
                    {filteredBookings.map((b) => (
                      <div key={b._id} className="admin-lead-row-card">
                        <div className="lead-row-header">
                          <div className="lead-row-user">
                            <div className="lead-user-avatar">
                              <User size={18} />
                            </div>
                            <div>
                              <span className="lead-user-name">{b.parentName}</span>
                              {b.referenceCode && (
                                <span className="lead-ref-pill" style={{ marginLeft: '0.5rem' }}>
                                  #{b.referenceCode}
                                </span>
                              )}
                            </div>
                            <span className="lead-date-stamp">
                              <Clock size={12} /> {new Date(b.createdAt).toLocaleDateString()} at {new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          <select 
                            value={b.status || 'Pending'} 
                            onChange={(e) => handleStatusChange(b._id, e.target.value)}
                            className={`status-dropdown ${(b.status || 'pending').toLowerCase()}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>

                        <div className="lead-info-tiles">
                          <div className="info-tile">
                            <span className="info-tile-label">Subject & Curriculum</span>
                            <span className="info-tile-val">{b.subject}</span>
                            <span className="info-tile-sub">{b.curriculum} ({b.grade})</span>
                          </div>

                          <div className="info-tile">
                            <span className="info-tile-label">Requested Slot</span>
                            <span className="info-tile-val">{b.preferredDate || 'Upcoming'}</span>
                            <span className="info-tile-sub">{b.preferredTime}</span>
                            {b.tutorPreference && (
                              <span className="info-tile-sub" style={{ color: '#0072CE', fontWeight: 600 }}>
                                👨‍🏫 {b.tutorPreference}
                              </span>
                            )}
                          </div>

                          <div className="info-tile">
                            <span className="info-tile-label">Parent Contact</span>
                            <a href={`tel:${b.phone}`} className="contact-action-btn">
                              <Phone size={13} /> {b.phone}
                            </a>
                            <a href={`mailto:${b.email}`} className="contact-action-btn">
                              <Mail size={13} /> {b.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : activeTab === 'inquiries' ? (
                /* Inquiries Tab */
                filteredInquiries.length === 0 ? (
                  <div className="admin-state-view">
                    <p>No inquiries found matching your search.</p>
                  </div>
                ) : (
                  <div className="lead-cards-deck">
                    {filteredInquiries.map((i) => (
                      <div key={i._id} className="admin-lead-row-card">
                        <div className="lead-row-header">
                          <div className="lead-row-user">
                            <div className="lead-user-avatar">
                              <Inbox size={18} />
                            </div>
                            <div>
                              <span className="lead-user-name">{i.name || 'Website Visitor'}</span>
                              <span className="lead-ref-pill" style={{ marginLeft: '0.5rem' }}>
                                {i.type || 'contact'}
                              </span>
                            </div>
                            <span className="lead-date-stamp">
                              <Clock size={12} /> {new Date(i.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {i.phone && (
                              <a href={`tel:${i.phone}`} className="contact-action-btn">
                                <Phone size={14} /> {i.phone}
                              </a>
                            )}
                            <a href={`mailto:${i.email}`} className="contact-action-btn">
                              <Mail size={14} /> {i.email}
                            </a>
                          </div>
                        </div>

                        {(i.course || i.message) && (
                          <div className="lead-message-quote">
                            {i.course && <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>Topic: {i.course}</div>}
                            {i.message && <div>{i.message}</div>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              ) : activeTab === 'careers' ? (
                /* Career Openings Tab */
                filteredCareers.length === 0 ? (
                  <div className="admin-state-view">
                    <Briefcase size={36} color="#94A3B8" />
                    <p>No career openings found. Click "+ Add New Opening" above to create one.</p>
                  </div>
                ) : (
                  <div className="career-cards-deck">
                    {filteredCareers.map((job) => (
                      <div key={job._id} className={`admin-career-card ${job.isActive === false ? 'paused' : ''}`}>
                        <div className="career-card-top-row">
                          <div className="career-title-block">
                            <div className="career-badges-row">
                              <span className="career-type-pill">{job.type}</span>
                              <span className={`career-status-pill ${job.isActive !== false ? 'active' : 'paused'}`}>
                                {job.isActive !== false ? <Eye size={12} /> : <EyeOff size={12} />}
                                {job.isActive !== false ? 'Active on Website' : 'Paused / Hidden'}
                              </span>
                            </div>
                            <h3 className="career-title-text">{job.title}</h3>
                          </div>

                          <div className="career-card-actions">
                            <button 
                              onClick={() => handleToggleJobStatus(job)} 
                              className="btn-career-act"
                              title={job.isActive !== false ? "Hide from website" : "Show on website"}
                            >
                              {job.isActive !== false ? <EyeOff size={14} /> : <Eye size={14} />}
                              <span>{job.isActive !== false ? 'Pause' : 'Activate'}</span>
                            </button>
                            <button 
                              onClick={() => handleOpenEditJob(job)} 
                              className="btn-career-act edit-act"
                              title="Edit role details"
                            >
                              <Edit2 size={14} />
                              <span>Edit</span>
                            </button>
                            <button 
                              onClick={() => handleDeleteJob(job)} 
                              className="btn-career-act delete-act"
                              title="Delete opening"
                            >
                              <Trash2 size={14} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>

                        <div className="career-meta-grid">
                          <div className="info-tile">
                            <span className="info-tile-label">Location / Mode</span>
                            <span className="info-tile-val">📍 {job.location || 'Global (Remote)'}</span>
                          </div>
                          <div className="info-tile">
                            <span className="info-tile-label">Compensation</span>
                            <span className="info-tile-val" style={{ color: '#0072CE' }}>💰 {job.compensation || 'Flexible'}</span>
                          </div>
                          <div className="info-tile">
                            <span className="info-tile-label">Curriculums & Boards</span>
                            <span className="info-tile-val">🎯 {job.boards || 'All Boards'}</span>
                          </div>
                        </div>

                        {job.requirements && (
                          <div className="career-requirements-box">
                            <strong>Requirements:</strong> {job.requirements}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
              ) : activeTab === 'applications' ? (
                /* Faculty Applications Tab */
                filteredApplications.length === 0 ? (
                  <div className="admin-state-view">
                    <Users size={36} color="#94A3B8" />
                    <p>No faculty applications received yet.</p>
                  </div>
                ) : (
                  <div className="lead-cards-deck">
                    {filteredApplications.map((app) => (
                      <div key={app._id} className="admin-lead-row-card">
                        <div className="lead-row-header">
                          <div className="lead-row-user">
                            <div className="lead-user-avatar" style={{ background: '#F0FDF4', color: '#16A34A' }}>
                              <User size={18} />
                            </div>
                            <div>
                              <span className="lead-user-name">{app.name}</span>
                              <span className="lead-ref-pill" style={{ marginLeft: '0.5rem', background: '#EFF6FF', color: '#1E40AF' }}>
                                {app.role || 'Teacher'}
                              </span>
                            </div>
                            <span className="lead-date-stamp">
                              <Clock size={12} /> Applied on {new Date(app.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <select 
                            value={app.status || 'New'} 
                            onChange={(e) => handleApplicationStatusChange(app._id, e.target.value)}
                            className={`status-dropdown ${(app.status || 'new').toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <option value="New">New Candidate</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Hired">Hired</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </div>

                        <div className="lead-info-tiles">
                          <div className="info-tile">
                            <span className="info-tile-label">Teaching Experience & Degree</span>
                            <span className="info-tile-val">{app.experience}</span>
                            <span className="info-tile-sub">{app.qualification || 'Not provided'}</span>
                          </div>

                          <div className="info-tile">
                            <span className="info-tile-label">Subject & Curriculums</span>
                            <span className="info-tile-val">{app.subject || 'All Subjects'}</span>
                            {app.linkedin && (
                              <a href={app.linkedin} target="_blank" rel="noopener noreferrer" className="info-tile-sub" style={{ color: '#0072CE', fontWeight: 600 }}>
                                🔗 View LinkedIn Profile
                              </a>
                            )}
                          </div>

                          <div className="info-tile">
                            <span className="info-tile-label">Candidate Contact</span>
                            <a href={`tel:${app.phone}`} className="contact-action-btn">
                              <Phone size={13} /> {app.phone}
                            </a>
                            <a href={`mailto:${app.email}`} className="contact-action-btn">
                              <Mail size={13} /> {app.email}
                            </a>
                          </div>
                        </div>

                        {app.notes && (
                          <div className="lead-message-quote" style={{ marginTop: '0.85rem' }}>
                            <strong>Teaching Philosophy:</strong> {app.notes}
                          </div>
                        )}

                        {/* Resume Box */}
                        <div style={{ marginTop: '1rem', paddingTop: '0.85rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontSize: '0.85rem' }}>
                            <FileText size={16} color="#0072CE" />
                            <span><strong>Resume Document:</strong> {app.resume?.fileName ? app.resume.fileName : 'No file attached'}</span>
                            {app.resume?.fileSize > 0 && (
                              <span style={{ color: '#94A3B8' }}>({(app.resume.fileSize / 1024).toFixed(1)} KB)</span>
                            )}
                          </div>

                          {app.resume?.fileData ? (
                            <a 
                              href={app.resume.fileData} 
                              download={app.resume.fileName || 'Candidate_Resume.pdf'}
                              className="btn-download-resume"
                            >
                              <Download size={14} /> Download Resume
                            </a>
                          ) : (
                            <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontStyle: 'italic' }}>No resume file attached</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : activeTab === 'media' ? (
                /* MEDIA & BANNERS MANAGER TAB */
                <div className="admin-media-manager-wrap">
                  <div className="admin-media-intro-banner">
                    <div className="media-intro-text">
                      <h4>Self-Serve Website Media & Banner Manager</h4>
                      <p>
                        Upload custom logos, student banners, and course covers directly from your laptop or phone, or paste an image URL. 
                        Published images are live immediately across the entire website.
                      </p>
                    </div>
                    {mediaToast && (
                      <div className={`media-inline-toast ${mediaToast.type}`}>
                        {mediaToast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        <span>{mediaToast.message}</span>
                      </div>
                    )}
                  </div>

                  {filteredMedia.length === 0 ? (
                    <div className="admin-state-view">
                      <Image size={36} color="#94A3B8" />
                      <p>No media slots match your current filter.</p>
                    </div>
                  ) : (
                    <div className="admin-media-grid">
                      {filteredMedia.map(slot => (
                        <div key={slot.key} className={`admin-media-card ${slot.isCustom ? 'custom-active' : ''}`}>
                          <div className="media-card-top">
                            <div className="media-card-title-group">
                              <span className="media-card-section-tag">{slot.section}</span>
                              <h4 className="media-card-label">{slot.label}</h4>
                            </div>
                            <span className={`media-status-badge ${slot.isCustom ? 'custom' : 'default'}`}>
                              {slot.isCustom ? (
                                <>
                                  <Check size={12} /> Custom Active
                                </>
                              ) : (
                                'Default Asset'
                              )}
                            </span>
                          </div>

                          <div className="media-preview-box">
                            <img 
                              src={slot.activeUrl} 
                              alt={slot.label} 
                              className="media-preview-img"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = slot.defaultUrl;
                              }}
                            />
                            {uploadingMediaKey === slot.key && (
                              <div className="media-preview-loading-overlay">
                                <RefreshCw size={24} className="spinning-icon" />
                                <span>Publishing Image...</span>
                              </div>
                            )}
                          </div>

                          <p className="media-card-desc">{slot.description}</p>

                          <div className="media-card-actions">
                            <label className="btn-media-upload">
                              <input 
                                type="file" 
                                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                                onChange={(e) => handleFileUpload(slot.key, e)}
                                disabled={uploadingMediaKey === slot.key}
                                style={{ display: 'none' }}
                              />
                              <UploadCloud size={14} />
                              <span>{slot.isCustom ? 'Replace Image' : 'Upload Image'}</span>
                            </label>

                            <div className="media-url-input-group">
                              <input 
                                type="url" 
                                placeholder="Or paste image URL..."
                                value={mediaUrlInputs[slot.key] || ''}
                                onChange={(e) => setMediaUrlInputs({ ...mediaUrlInputs, [slot.key]: e.target.value })}
                                disabled={uploadingMediaKey === slot.key}
                                className="media-url-input"
                              />
                              <button 
                                type="button"
                                onClick={() => handleUrlSave(slot.key)}
                                disabled={uploadingMediaKey === slot.key || !(mediaUrlInputs[slot.key] || '').trim()}
                                className="btn-media-save-url"
                                title="Save Image URL"
                              >
                                Save
                              </button>
                            </div>

                            {slot.isCustom && (
                              <button 
                                type="button"
                                onClick={() => handleResetMedia(slot)}
                                disabled={uploadingMediaKey === slot.key}
                                className="btn-media-reset"
                                title="Reset back to default image"
                              >
                                <RotateCcw size={13} />
                                <span>Reset to Default</span>
                              </button>
                            )}
                          </div>

                          {slot.updatedAt && (
                            <div className="media-card-timestamp">
                              Last updated: {new Date(slot.updatedAt).toLocaleDateString()} at {new Date(slot.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : activeTab === 'leadership' ? (
                /* ACADEMIC LEADERSHIP TAB */
                filteredLeadership.length === 0 ? (
                  <div className="admin-state-view">
                    <GraduationCap size={36} color="#94A3B8" />
                    <p>No academic leadership profiles found matching your search.</p>
                    <button onClick={handleOpenAddLeader} className="btn-add-opening" style={{ marginTop: '0.75rem' }}>
                      <Plus size={16} /> <span>Add New Leader</span>
                    </button>
                  </div>
                ) : (
                  <div className="lead-cards-deck">
                    {filteredLeadership.map((leader) => (
                      <div key={leader._id} className="admin-lead-row-card">
                        <div className="lead-row-header">
                          <div className="lead-row-user">
                            <img 
                              src={leader.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'} 
                              alt={leader.name} 
                              className="leader-avatar-img"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                              }}
                            />
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span className="lead-user-name">{leader.name}</span>
                                <span className={`lead-ref-pill ${leader.isActive !== false ? 'active-pill' : 'paused-pill'}`}>
                                  {leader.isActive !== false ? '● Visible on Website' : '○ Hidden'}
                                </span>
                                {leader.order !== undefined && (
                                  <span className="lead-date-stamp" style={{ marginLeft: 0 }}>
                                    Order #{leader.order}
                                  </span>
                                )}
                              </div>
                              <span className="leader-role-text">{leader.role}</span>
                            </div>
                          </div>

                          <div className="job-card-actions">
                            <button 
                              onClick={() => handleToggleLeaderStatus(leader)}
                              className={`btn-action-icon ${leader.isActive !== false ? 'btn-active' : 'btn-paused'}`}
                              title={leader.isActive !== false ? 'Hide from public site' : 'Make visible on public site'}
                            >
                              {leader.isActive !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                            </button>
                            <button 
                              onClick={() => handleOpenEditLeader(leader)}
                              className="btn-action-icon btn-edit"
                              title="Edit Leader"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button 
                              onClick={() => handleDeleteLeader(leader)}
                              className="btn-action-icon btn-delete"
                              title="Delete Leader"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        <div className="lead-info-tiles">
                          <div className="info-tile">
                            <span className="info-tile-label">Academic Credentials & Degrees</span>
                            <span className="info-tile-val">{leader.credentials || 'Not specified'}</span>
                          </div>
                          <div className="info-tile">
                            <span className="info-tile-label">Specialization & Curriculums</span>
                            <span className="info-tile-val" style={{ color: '#0072CE' }}>
                              {leader.subjects || 'General Curriculum'}
                            </span>
                          </div>
                          <div className="info-tile">
                            <span className="info-tile-label">Public Profile Photo</span>
                            <a href={leader.image} target="_blank" rel="noopener noreferrer" className="contact-action-btn">
                              <Image size={13} /> View Photo Link
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* PARENT REVIEWS / TESTIMONIALS TAB */
                filteredTestimonials.length === 0 ? (
                  <div className="admin-state-view">
                    <MessageSquareQuote size={36} color="#94A3B8" />
                    <p>No parent reviews found matching your search.</p>
                    <button onClick={handleOpenAddTestimonial} className="btn-add-opening" style={{ marginTop: '0.75rem' }}>
                      <Plus size={16} /> <span>Add First Review</span>
                    </button>
                  </div>
                ) : (
                  <div className="lead-cards-deck">
                    {filteredTestimonials.map((t) => (
                      <div key={t._id} className="admin-lead-row-card">
                        <div className="lead-row-header">
                          <div className="lead-row-user">
                            <div className="lead-user-avatar" style={{ background: '#FEF3C7', color: '#B45309' }}>
                              <MessageSquareQuote size={18} />
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <span className="lead-user-name">{t.author}</span>
                                <span className={`lead-ref-pill ${t.isActive !== false ? 'active-pill' : 'paused-pill'}`}>
                                  {t.isActive !== false ? '● Visible on Website' : '○ Hidden'}
                                </span>
                                {t.order !== undefined && (
                                  <span className="lead-date-stamp" style={{ marginLeft: 0 }}>
                                    Order #{t.order}
                                  </span>
                                )}
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', color: '#D97706', fontSize: '0.82rem', fontWeight: 700 }}>
                                  {'★'.repeat(t.rating || 5)}
                                </span>
                              </div>
                              <span style={{ fontSize: '0.85rem', color: '#0072CE', fontWeight: 600 }}>
                                {t.role}
                              </span>
                            </div>
                          </div>

                          <div className="job-card-actions">
                            <button 
                              onClick={() => handleToggleTestimonialStatus(t)}
                              className={`btn-action-icon ${t.isActive !== false ? 'btn-active' : 'btn-paused'}`}
                              title={t.isActive !== false ? 'Hide from public site' : 'Make visible on public site'}
                            >
                              {t.isActive !== false ? <Eye size={15} /> : <EyeOff size={15} />}
                            </button>
                            <button 
                              onClick={() => handleOpenEditTestimonial(t)}
                              className="btn-action-icon btn-edit"
                              title="Edit Review"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button 
                              onClick={() => handleDeleteTestimonial(t)}
                              className="btn-action-icon btn-delete"
                              title="Delete Review"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        <div className="lead-message-quote" style={{ marginTop: '0.75rem', fontStyle: 'italic', fontSize: '0.92rem', color: '#334155', background: '#F8FAFC', padding: '0.85rem 1rem', borderRadius: '8px', borderLeft: '3.5px solid #0072CE', lineHeight: 1.55 }}>
                          "{t.quote}"
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </main>

      {/* Career Opening Add / Edit Modal */}
      {isJobModalOpen && (
        <div className="career-modal-backdrop" onClick={() => setIsJobModalOpen(false)}>
          <div className="career-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="career-modal-header">
              <h3>{editingJob ? 'Edit Career Opening' : 'Add New Career Opening'}</h3>
              <button 
                onClick={() => setIsJobModalOpen(false)} 
                className="career-modal-close-btn"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="career-form-grid">
              <div className="form-group">
                <label>Job Title *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Cambridge IGCSE & A-Level Mathematics Faculty"
                  value={jobFormData.title}
                  onChange={e => setJobFormData({ ...jobFormData, title: e.target.value })}
                />
              </div>

              <div className="career-form-row">
                <div className="form-group">
                  <label>Employment Type *</label>
                  <select 
                    value={jobFormData.type}
                    onChange={e => setJobFormData({ ...jobFormData, type: e.target.value })}
                  >
                    <option value="Part-time / Full-time Remote">Part-time / Full-time Remote</option>
                    <option value="Remote Flexible">Remote Flexible</option>
                    <option value="Full-time Remote">Full-time Remote</option>
                    <option value="Part-time Remote">Part-time Remote</option>
                    <option value="Contract / Project-based">Contract / Project-based</option>
                    <option value="On-site / Hybrid">On-site / Hybrid</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Location *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Global (Remote) or Ludhiana, India"
                    value={jobFormData.location}
                    onChange={e => setJobFormData({ ...jobFormData, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="career-form-row">
                <div className="form-group">
                  <label>Compensation / Pay Rate</label>
                  <input 
                    type="text"
                    placeholder="e.g. $35 - $65 / hr or ₹6 - ₹10 LPA"
                    value={jobFormData.compensation}
                    onChange={e => setJobFormData({ ...jobFormData, compensation: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Display Status on Website</label>
                  <select 
                    value={jobFormData.isActive ? 'active' : 'paused'}
                    onChange={e => setJobFormData({ ...jobFormData, isActive: e.target.value === 'active' })}
                  >
                    <option value="active">Active (Visible on Careers Page)</option>
                    <option value="paused">Paused / Hidden (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Curriculums & Exam Boards</label>
                <input 
                  type="text"
                  placeholder="e.g. CAIE 0580/0607, Edexcel 4MA1, IB DP Physics HL"
                  value={jobFormData.boards}
                  onChange={e => setJobFormData({ ...jobFormData, boards: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Key Requirements & Qualifications *</label>
                <textarea 
                  rows="4"
                  required
                  placeholder="e.g. Minimum 4+ years verified IGCSE/A-Level teaching experience. Examiner credentials preferred..."
                  value={jobFormData.requirements}
                  onChange={e => setJobFormData({ ...jobFormData, requirements: e.target.value })}
                ></textarea>
              </div>

              <div className="career-modal-actions">
                <button 
                  type="button" 
                  onClick={() => setIsJobModalOpen(false)}
                  className="btn-modal-cancel"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-modal-save"
                  disabled={savingJob}
                >
                  {savingJob ? <RefreshCw size={16} className="spinning-icon" /> : <Sparkles size={16} />}
                  <span>{editingJob ? 'Update Opening' : 'Save Opening'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Academic Leadership Add / Edit Modal */}
      {isLeaderModalOpen && (
        <div className="career-modal-backdrop" onClick={() => setIsLeaderModalOpen(false)}>
          <div className="career-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="career-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <GraduationCap size={20} color="#0072CE" />
                <h3>{editingLeader ? 'Edit Academic Leader' : 'Add New Academic Leader'}</h3>
              </div>
              <button 
                onClick={() => setIsLeaderModalOpen(false)} 
                className="career-modal-close-btn"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveLeader} className="career-form-grid">
              <div className="career-form-row">
                <div className="form-group">
                  <label>Full Name & Title *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Dr. Elena Vance"
                    value={leaderFormData.name}
                    onChange={e => setLeaderFormData({ ...leaderFormData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Role / Designation *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Head of Sciences & IB DP Advisor"
                    value={leaderFormData.role}
                    onChange={e => setLeaderFormData({ ...leaderFormData, role: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Academic Credentials & Background</label>
                <input 
                  type="text"
                  placeholder="e.g. Ph.D. Oxford, 14+ Years CAIE & IB Examiner"
                  value={leaderFormData.credentials}
                  onChange={e => setLeaderFormData({ ...leaderFormData, credentials: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Specialization & Curriculums</label>
                <input 
                  type="text"
                  placeholder="e.g. Physics HL & Chemistry SL/HL"
                  value={leaderFormData.subjects}
                  onChange={e => setLeaderFormData({ ...leaderFormData, subjects: e.target.value })}
                />
              </div>

              {/* Profile Photo File Upload or URL */}
              <div className="form-group">
                <label>Profile Picture</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <img 
                    src={leaderFormData.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'} 
                    alt="Preview" 
                    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #0072CE' }} 
                  />
                  <div style={{ flex: 1, minWidth: '220px' }}>
                    <label style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#0F172A', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600 }}>
                      <UploadCloud size={16} />
                      <span>{uploadingLeaderImg ? 'Processing...' : 'Upload Image File'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleLeaderImageUpload} 
                        style={{ display: 'none' }} 
                        disabled={uploadingLeaderImg}
                      />
                    </label>
                    <p style={{ margin: '0.35rem 0 0', fontSize: '0.75rem', color: '#64748B' }}>
                      Or paste a direct photo web link below:
                    </p>
                  </div>
                </div>
                <input 
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={leaderFormData.image}
                  onChange={e => setLeaderFormData({ ...leaderFormData, image: e.target.value })}
                />
              </div>

              <div className="career-form-row">
                <div className="form-group">
                  <label>Display Order Priority</label>
                  <input 
                    type="number"
                    min="1"
                    max="99"
                    value={leaderFormData.order}
                    onChange={e => setLeaderFormData({ ...leaderFormData, order: parseInt(e.target.value, 10) || 0 })}
                  />
                  <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>1 appears first, 2 appears second, etc.</span>
                </div>

                <div className="form-group">
                  <label>Website Visibility</label>
                  <select 
                    value={leaderFormData.isActive ? 'active' : 'hidden'}
                    onChange={e => setLeaderFormData({ ...leaderFormData, isActive: e.target.value === 'active' })}
                  >
                    <option value="active">Active (Visible on About Page)</option>
                    <option value="hidden">Hidden / Draft</option>
                  </select>
                </div>
              </div>

              <div className="career-modal-actions">
                <button 
                  type="button" 
                  onClick={() => setIsLeaderModalOpen(false)}
                  className="btn-modal-cancel"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-modal-save"
                  disabled={savingLeader || uploadingLeaderImg}
                >
                  {savingLeader ? <RefreshCw size={16} className="spinning-icon" /> : <Sparkles size={16} />}
                  <span>{editingLeader ? 'Update Leader' : 'Save Leader'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Testimonials / Reviews Add / Edit Modal */}
      {isTestimonialModalOpen && (
        <div className="career-modal-backdrop" onClick={() => setIsTestimonialModalOpen(false)}>
          <div className="career-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="career-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MessageSquareQuote size={20} color="#0072CE" />
                <h3>{editingTestimonial ? 'Edit Parent Review' : 'Add New Parent Review'}</h3>
              </div>
              <button 
                onClick={() => setIsTestimonialModalOpen(false)} 
                className="career-modal-close-btn"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="career-form-grid">
              <div className="career-form-row">
                <div className="form-group">
                  <label>Parent / Student Full Name *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Ayaz Ahmed Khan"
                    value={testimonialFormData.author}
                    onChange={e => setTestimonialFormData({ ...testimonialFormData, author: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Role / Student Description *</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Parent of Ibrahim Khan"
                    value={testimonialFormData.role}
                    onChange={e => setTestimonialFormData({ ...testimonialFormData, role: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Review Quote / Feedback *</label>
                <textarea 
                  rows="4"
                  required
                  placeholder="e.g. My child developed real, useful skills in a fun and interactive way. Always something new to learn here!"
                  value={testimonialFormData.quote}
                  onChange={e => setTestimonialFormData({ ...testimonialFormData, quote: e.target.value })}
                ></textarea>
              </div>

              <div className="career-form-row">
                <div className="form-group">
                  <label>Star Rating</label>
                  <select 
                    value={testimonialFormData.rating}
                    onChange={e => setTestimonialFormData({ ...testimonialFormData, rating: parseInt(e.target.value, 10) || 5 })}
                  >
                    <option value={5}>★★★★★ (5 Stars - Exceptional)</option>
                    <option value={4}>★★★★☆ (4 Stars - Great)</option>
                    <option value={3}>★★★☆☆ (3 Stars - Good)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Display Priority Order</label>
                  <input 
                    type="number"
                    min="1"
                    max="99"
                    value={testimonialFormData.order}
                    onChange={e => setTestimonialFormData({ ...testimonialFormData, order: parseInt(e.target.value, 10) || 0 })}
                  />
                  <span style={{ fontSize: '0.74rem', color: '#94A3B8' }}>1 appears first on Home Page</span>
                </div>
              </div>

              <div className="form-group">
                <label>Website Visibility</label>
                <select 
                  value={testimonialFormData.isActive ? 'active' : 'hidden'}
                  onChange={e => setTestimonialFormData({ ...testimonialFormData, isActive: e.target.value === 'active' })}
                >
                  <option value="active">Active (Visible on Home Page)</option>
                  <option value="hidden">Hidden / Draft</option>
                </select>
              </div>

              <div className="career-modal-actions">
                <button 
                  type="button" 
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="btn-modal-cancel"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-modal-save"
                  disabled={savingTestimonial}
                >
                  {savingTestimonial ? <RefreshCw size={16} className="spinning-icon" /> : <Sparkles size={16} />}
                  <span>{editingTestimonial ? 'Update Review' : 'Save Review'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal Dialog */}
      {isPasswordModalOpen && (
        <div className="auth-modal-overlay" onClick={() => setIsPasswordModalOpen(false)}>
          <div className="admin-pw-modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="admin-pw-modal-header">
              <div className="admin-pw-header-title">
                <KeyRound size={18} className="gold-key-icon" />
                <h3>Change Admin Passkey</h3>
              </div>
              <button 
                onClick={() => setIsPasswordModalOpen(false)} 
                className="admin-pw-modal-close"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleChangePasswordSubmit} className="admin-pw-form">
              <p className="admin-pw-subtitle">
                Update your master management portal password. Once changed, this will be saved securely and used for future logins.
              </p>

              {passwordModalError && (
                <div className="admin-pw-alert error">
                  <AlertCircle size={15} />
                  <span>{passwordModalError}</span>
                </div>
              )}

              {passwordModalSuccess && (
                <div className="admin-pw-alert success">
                  <CheckCircle2 size={15} />
                  <span>{passwordModalSuccess}</span>
                </div>
              )}

              <div className="admin-pw-field">
                <label>Current Password *</label>
                <div className="admin-pw-input-wrap">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter current password"
                    value={passwordFormData.currentPassword}
                    onChange={e => {
                      setPasswordFormData({ ...passwordFormData, currentPassword: e.target.value });
                      setPasswordModalError('');
                    }}
                    disabled={isUpdatingPassword}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="admin-pw-eye"
                    tabIndex={-1}
                  >
                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="admin-pw-field">
                <label>New Password *</label>
                <div className="admin-pw-input-wrap">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter new password (min. 6 characters)"
                    value={passwordFormData.newPassword}
                    onChange={e => {
                      setPasswordFormData({ ...passwordFormData, newPassword: e.target.value });
                      setPasswordModalError('');
                    }}
                    disabled={isUpdatingPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="admin-pw-eye"
                    tabIndex={-1}
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="admin-pw-field">
                <label>Confirm New Password *</label>
                <div className="admin-pw-input-wrap">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    placeholder="Confirm new password"
                    value={passwordFormData.confirmPassword}
                    onChange={e => {
                      setPasswordFormData({ ...passwordFormData, confirmPassword: e.target.value });
                      setPasswordModalError('');
                    }}
                    disabled={isUpdatingPassword}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="admin-pw-eye"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="admin-pw-actions">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="btn-pw-cancel"
                  disabled={isUpdatingPassword}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-pw-save"
                  disabled={isUpdatingPassword}
                >
                  {isUpdatingPassword ? (
                    <>
                      <RefreshCw size={15} className="spinning-icon" /> Saving...
                    </>
                  ) : (
                    <>
                      <KeyRound size={15} /> Update Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
