import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import React from 'react';
import debounce from 'lodash.debounce';
import { SortableItem } from './SortableItems';
import toast from 'react-hot-toast';
import { DndContext, closestCenter } from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import './carousel.css';
import { Radius } from 'lucide-react';
import { video } from 'framer-motion/client';

//api upload
const API = import.meta.env.VITE_APIUPLOAD;

export default function CarouselUpload({
  targetUserName,
  setTargetUserName,
  onUserChange,
}) {
  const { user } = useAuthStore();

  const [files, setFiles] = useState({});
  const [carousel, setCarousel] = useState(null);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const [posterImages, setPosterImages] = useState([]);
  const [loadingVideo, setLoadingVideo] = useState(null);
  const [image360, setImage360] = useState(null);
  const [image3608k, setImage3608k] = useState(null);
  const [model3D, setModel3D] = useState(null);
  const [music, setMusic] = useState(null);
  const [hdri, setHdri] = useState(null);
  const [selectedImageGlow, setSelectedImageGlow] = useState('#fbadff');
  const [selectedVideoGlow, setSelectedVideoGlow] = useState('#fbadff');

  //video settings
  const [videoRadius, setVideoRadius] = useState('');
  const [videoGlow, setVideoGlow] = useState([]);
  const [videoSizeSmallScreen, setVideoSizeSmallScreen] = useState('');
  const [videoSizeBigScreen, setVideoSizeBigScreen] = useState('');
  const [hoverGlow, setHoverGlow] = useState('');
  const [autoVideoPlay, setAutoVideoPlay] = useState('');
  //image settings
  const [imageRadius, setImageRadius] = useState('');
  const [imageGlow, setImageGlow] = useState([]);
  const [imageSizeSmallScreen, setImageSizeSmallScreen] = useState('');
  const [imageSizeBigScreen, setImageSizeBigScreen] = useState('');
  const [imageHoverGlow, setImageHoverGlow] = useState('');

  //axios uploading percentage
  const [uploading, setUploading] = useState(false);
  const [uploadingType, setUploadingType] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  // etc...

  //settings
  // =========================================================
  // USERNAME
  // =========================================================

  const [savedUserName, setSavedUserName] = useState('');
  const [userNameInput, setUserNameInput] = useState('');

  // =========================================================
  // BUY NOW BUTTON
  // =========================================================

  const [buyNowButtonText, setBuyNowButtonText] = useState('');
  const [buyNowButtonlink, setBuyNowButtonlink] = useState(['']);
  const [buyNowButtonFontFamily, setBuyNowButtonFontFamily] = useState(null);

  const [buyNowButtonBackgroundColor, setBuyNowButtonBackgroundColor] =
    useState('#000000');

  const [buyNowButtonTextColor, setBuyNowButtonTextColor] = useState('#ffffff');

  const [buyNowButtonRadius, setBuyNowButtonRadius] = useState('');

  const [buyNowButtonHoverBGColor, setBuyNowButtonHoverBGColor] =
    useState('#000000');

  const [buyNowButtonHoverTextColor, setBuyNowButtonHoverTextColor] =
    useState('#ffffff');

  const [buyNowButtonFontSize, setBuyNowButtonFontSize] = useState('');

  const [buyNowButtonHeightSmallScreen, setBuyNowButtonHeightSmallScreen] =
    useState('');

  const [buyNowButtonHeightMediumScreen, setBuyNowButtonHeightMediumScreen] =
    useState('');

  const [buyNowButtonHeightBigScreen, setBuyNowButtonHeightBigScreen] =
    useState('');

  // =========================================================
  // GLOW LOGO
  // =========================================================

  const [logoFontFamily, setLogoFontFamily] = useState(null);

  const [logoFontSizeSmallScreen, setLogoFontSizeSmallScreen] = useState('');
  const [logoFontSizeMediumScreen, setLogoFontSizeMediumScreen] = useState('');
  const [logoFontSizeBigScreen, setLogoFontSizeBigScreen] = useState('');

  const [logoGlowColors, setLogoGlowColors] = useState([]);
  const [selectedLogoGlow, setSelectedLogoGlow] = useState('#ffffff');

  const [logoText, setLogoText] = useState('');
  const [logoVerticalHeight, setLogoVerticalHeight] = useState('');

  // =========================================================
  // MUSIC BUTTON
  // =========================================================

  const [musicButtonGlowColor, setMusicButtonGlowColor] = useState('#ffffff');

  const [musicButtonBackGroundColor, setMusicButtonBackGroundColor] =
    useState('#000000');

  // =========================================================
  // FREEZE BUTTON
  // =========================================================

  const [freezeButtonGlowColor, setFreezeButtonGlowColor] = useState('#ffffff');

  const [freezeButtonBackgroundColor, setFreezeButtonBackgroundColor] =
    useState('#000000');

  // =========================================================
  // CREATOR ATTRIBUTION
  // =========================================================

  const [atributionText, setAtributionText] = useState('');
  const [atributionLink, setAtributionLink] = useState('');

  const [atributionBulbGlowColor, setAtributionBulbGlowColor] =
    useState('#ffffff');

  const [atributionBackgroundColor, setAtributionBackgroundColor] =
    useState('#000000');

  // =========================================================
  // GLB
  // =========================================================

  const [modelSizeTinyScreen, setModelSizeTinyScreen] = useState('');
  const [modelSizeSmallScreen, setModelSizeSmallScreen] = useState('');
  const [modelSizeMediumScreen, setModelSizeMediumScreen] = useState('');
  const [modelSizeBigScreen, setModelSizeBigScreen] = useState('');
  const [modelPosition, setModelPosition] = useState('');
  const [modelPositionMedium, setModelPositionMedium] = useState('');
  const [modelPositionBig, setModelPositionBig] = useState('');
  const [modelRoughness, setModelRoughness] = useState('');
  const [modelMetalness, setModelMetalness] = useState('');
  const [modelEnvMapIntensity, setModelEnvMapIntensity] = useState('');
  const [modelAnimationSpeed, setModelAnimationSpeed] = useState('');
  const [modelRepaintColor, setModelRepaintColor] = useState('');
  const [modelRotation, setModelRotation] = useState('');
  const [modelRotationX, setModelRotationX] = useState('');
  const [modelRotationZ, setModelRotationZ] = useState('');

  // =========================================================
  // CAROUSEL CONTROL
  // =========================================================

  const [carouselRadius, setCarouselRadius] = useState('');

  // =========================================================
  // HDRI
  // =========================================================

  const [hdriBrigthness, setHdriBrigthness] = useState('');

  // =========================================================
  // POPUP HELP TEXT
  // =========================================================

  const [popupText, setPopupText] = useState('');

  const [popupTextSize, setPopupTextSize] = useState('');

  const [popupTextColor, setPopupTextColor] = useState('#ffffff');

  const [popupTextFontFamily, setPopupTextFontFamily] = useState(null);

  const [popupTextBackgroundColor, setPopupTextBackgroundColor] =
    useState('#000000');

  // =========================================================
  // GLOW BORDER
  // =========================================================

  const [glowBorderRotationSpeed, setGlowBorderRotationSpeed] = useState('');

  // =========================================================
  // DOMAIN
  // =========================================================

  const [allowedDomain, setAllowedDomain] = useState('');

  // =========================================================
  // CAMERA FOV
  // =========================================================

  // =========================================================
  // BRAND ENGINE TILT
  // =========================================================

  useState('');
  // =========================================================
  // CONTACT INFO
  // =========================================================

  const [contactInfo, setContactInfo] = useState('');

  // =========================================================
  // VIEW DISPLAY HEIGHT
  // =========================================================

  const [viewDisplayHeightSmallScreen, setViewDisplayHeightSmallScreen] =
    useState('');

  const [viewDisplayHeightMediumScreen, setViewDisplayHeightMediumScreen] =
    useState('');

  const [viewDisplayHeightBigScreen, setViewDisplayHeightBigScreen] =
    useState('');

  // =========================================================
  // SPIN CONTAINER HEIGHT
  // =========================================================

  const [spinConHeightSmallScreen, setSpinConHeightSmallScreen] = useState('');

  const [spinConHeightMediumScreen, setSpinConHeightMediumScreen] =
    useState('');

  const [spinConHeightBigScreen, setSpinConHeightBigScreen] = useState('');

  //camera
  const [cameraPosition, setCameraPosition] = useState('');
  const [smallScreen, setSmallScreen] = useState('');
  const [bigScreen, setBigScreen] = useState('');

  const [appType, setAppType] = useState('');

  const [rotationSpeed, setRotationSpeed] = useState('');
  const [embedType, setEmbedType] = useState('');

  const [brandEngineTiltSmallScreen, setBrandEngineTiltSmallScreen] =
    useState('');
  const [brandEngineTiltMediumScreen, setBrandEngineTiltMediumScreen] =
    useState('');
  const [brandEngineTiltBigScreen, setBrandEngineTiltBigScreen] = useState('');

  const [fontUploading, setFontUploading] = useState(false);

  const [visibleAngleGreater, setVisibleAngleGreater] = useState('');
  const [visibleAngleLess, setVisibleAngleLess] = useState('');

  const [initial360RotationY, setInitial360RotationY] = useState('');
  //clearing input file space of selected file
  const resetInputs = () => {
    document.querySelectorAll("input[type='file']").forEach((input) => {
      input.value = null;
    });
  };

  const [flyingAssetTiltX, setFlyingAssetTiltX] = useState('');
  const [flyingAssetTiltY, setFlyingAssetTiltY] = useState('');
  const [flyingAssetTiltZ, setFlyingAssetTiltZ] = useState('');
  const [flyingAssetHoverSpeed, setFlyingAssetHoverSpeed] = useState('');

  const [flyingAssetHoverHeightMin, setFlyingAssetHoverHeightMin] =
    useState('');

  const [flyingAssetHoverHeightMax, setFlyingAssetHoverHeightMax] =
    useState('');

  //Bandwidth
  const [bandwidthCount, setBandwidthCount] = useState(0);
  const [bandwidthExpiresAt, setBandwidthExpiresAt] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  // This is the amount the admin wants to add/subtract
  const [bandwidthAdjustment, setBandwidthAdjustment] = useState('');
  const [userRole, setUserRole] = useState('');

  //total users, admin and paid users count
  const [totalUsers, setTotalUsers] = useState(0);
  const [paidUsers, setPaidUsers] = useState(0);
  const [adminUsers, setAdminUsers] = useState(0);
  // =========================
  // FETCH SAVED CAROUSEL
  // =========================

  const fetchCarousel = async (targetUserName = '') => {
    try {
      //determine the active account:
      const cleanTargetUserName = targetUserName.trim();
      //to allow admin to be able to fetch other user from search
      const res = await axios.get(`${API}/carousel`, {
        params: targetUserName ? { targetUserName: targetUserName.trim() } : {},
        withCredentials: true,
      });

      const carousel = res.data.carousel;
      const settings = res.data.settings;

      // const res = await axios.get(`${API}/carousel/${user._id}`);
      // const res = await axios.get(`${API}/carousel`);
      // const carousel = res.data.carousel;
      // const settings = res.data.settings;

      setCarousel(carousel);

      // =========================
      // GENERAL
      // =========================

      //preventing admin special editing frontend from
      //disappearing if role disappear
      // Only update the logged-in user's role during normal loading.
      // Do not replace the admin's role with the target user's role.
      // IMPORTANT
      if (cleanTargetUserName) {
        onUserChange?.(cleanTargetUserName);
      }
      // General
      if (!cleanTargetUserName) {
        setUserRole(settings?.userRole || '');
      }
      // setUserRole(settings?.userRole || '');

      setSavedUserName(settings?.userName || '');
      setContactInfo(settings?.contactInfo ?? '');
      setAppType(settings?.appType ?? '');
      setEmbedType(settings?.embedType ?? '');
      setAllowedDomain(settings?.allowedDomain ?? '');

      // =========================
      // IMAGES
      // =========================

      setImages(carousel?.images?.files || []);

      setImageRadius(carousel?.images?.imageRadius ?? '');

      setImageGlow(carousel?.images?.imageGlow || []);

      setImageSizeSmallScreen(carousel?.images?.imageSizeSmallScreen ?? '');

      setImageSizeBigScreen(carousel?.images?.imageSizeBigScreen ?? '');

      setImageHoverGlow(carousel?.images?.imageHoverGlow ?? '');

      // =========================
      // VIDEOS
      // =========================

      setVideos(carousel?.videos?.files || []);

      setVideoRadius(carousel?.videos?.videoRadius ?? '');

      setVideoGlow(carousel?.videos?.videoGlow || []);

      setVideoSizeSmallScreen(carousel?.videos?.videoSizeSmallScreen ?? '');

      setVideoSizeBigScreen(carousel?.videos?.videoSizeBigScreen ?? '');

      setHoverGlow(carousel?.videos?.hoverGlow ?? '');

      setAutoVideoPlay(carousel?.videos?.autoPlayVideo ?? '');

      // =========================
      // MEDIA
      // =========================

      setPosterImages(carousel?.posterImages || []);

      setLoadingVideo(carousel?.loadingVideo ?? null);

      // setImage360(carousel?.image360 ?? null);
      //adding to the file link name to prevent cors error due to multiple caching of the same file in the same domain
      const dashboardImage360 = carousel?.image360
        ? `${carousel.image360}?context=dashboard`
        : null;

      setImage360(dashboardImage360);

      // setImage3608k(carousel?.image3608k ?? null);
      //adding to the file link name to prevent cors error due to multiple caching of the same file in the same domain
      const dashboardImage3608k = carousel?.image3608k
        ? `${carousel.image3608k}?context=dashboard`
        : null;

      setImage3608k(dashboardImage3608k);

      setMusic(carousel?.music ?? null);

      setHdri(carousel?.hdri ?? null);

      setModel3D(carousel?.model3D ?? null);

      // =========================
      // BUY NOW BUTTON
      // =========================

      setBuyNowButtonText(settings?.buyNowButtonText ?? '');

      setBuyNowButtonlink(
        Array.isArray(settings?.buyNowButtonlink)
          ? settings.buyNowButtonlink
          : [''],
      );

      setBuyNowButtonFontFamily(settings?.buyNowButtonFontFamily ?? '');

      setBuyNowButtonBackgroundColor(
        settings?.buyNowButtonBackgroundColor ?? '',
      );

      setBuyNowButtonTextColor(settings?.buyNowButtonTextColor ?? '');

      setBuyNowButtonRadius(settings?.buyNowButtonRadius ?? '');

      setBuyNowButtonFontSize(settings?.buyNowButtonFontSize ?? '');

      setBuyNowButtonHoverBGColor(settings?.buyNowButtonHoverBGColor ?? '');

      setBuyNowButtonHoverTextColor(settings?.buyNowButtonHoverTextColor ?? '');

      setBuyNowButtonHeightSmallScreen(
        settings?.buyNowButtonHeightSmallScreen ?? '',
      );

      setBuyNowButtonHeightMediumScreen(
        settings?.buyNowButtonHeightMediumScreen ?? '',
      );

      setBuyNowButtonHeightBigScreen(
        settings?.buyNowButtonHeightBigScreen ?? '',
      );

      // =========================
      // LOGO
      // =========================

      setLogoFontFamily(settings?.logoFontFamily ?? '');

      setLogoFontSizeSmallScreen(settings?.logoFontSizeSmallScreen ?? '');

      setLogoFontSizeMediumScreen(settings?.logoFontSizeMediumScreen ?? '');

      setLogoFontSizeBigScreen(settings?.logoFontSizeBigScreen ?? '');

      setLogoGlowColors(settings?.logoGlowColors || []);

      setLogoText(settings?.logoText ?? '');

      setLogoVerticalHeight(settings?.logoVerticalHeight ?? '');

      // =========================
      // MUSIC BUTTON
      // =========================

      setMusicButtonGlowColor(settings?.musicButtonGlowColor ?? '');

      setMusicButtonBackGroundColor(settings?.musicButtonBackGroundColor ?? '');

      // =========================
      // FREEZE BUTTON
      // =========================

      setFreezeButtonGlowColor(settings?.freezeButtonGlowColor ?? '');

      setFreezeButtonBackgroundColor(
        settings?.freezeButtonBackgroundColor ?? '',
      );

      // =========================
      // ATTRIBUTION
      // =========================

      setAtributionText(settings?.atributionText ?? '');

      setAtributionLink(settings?.atributionLink ?? '');

      setAtributionBulbGlowColor(settings?.atributionBulbGlowColor ?? '');

      setAtributionBackgroundColor(settings?.atributionBackgroundColor ?? '');

      // =========================
      // GLB
      // =========================

      setModelSizeTinyScreen(settings?.modelSizeTinyScreen ?? '');

      setModelSizeSmallScreen(settings?.modelSizeSmallScreen ?? '');

      setModelSizeMediumScreen(settings?.modelSizeMediumScreen ?? '');

      setModelSizeBigScreen(settings?.modelSizeBigScreen ?? '');

      setModelPosition(settings?.modelPosition ?? '');

      setModelPositionMedium(settings?.modelPositionMedium ?? '');

      setModelPositionBig(settings?.modelPositionBig ?? '');

      setModelRoughness(settings?.modelRoughness ?? '');

      setModelMetalness(settings?.modelMetalness ?? '');

      setModelEnvMapIntensity(settings?.modelEnvMapIntensity ?? '');

      setModelAnimationSpeed(settings?.modelAnimationSpeed ?? '');
      setModelRepaintColor(settings?.modelRepaintColor ?? '');

      setModelRotation(settings?.modelRotation ?? '');

      setModelRotationX(settings?.modelRotationX ?? '');
      setModelRotationZ(settings?.modelRotationZ ?? '');

      // =========================
      // CAROUSEL CONTROL
      // =========================

      setRotationSpeed(settings?.rotationSpeed ?? '');

      setCarouselRadius(settings?.carouselRadius ?? '');

      // =========================
      // HDRI
      // =========================

      setHdriBrigthness(settings?.hdriBrigthness ?? '');

      // =========================
      // POPUP
      // =========================

      setPopupText(settings?.popupText ?? '');

      setPopupTextSize(settings?.popupTextSize ?? '');

      setPopupTextColor(settings?.popupTextColor ?? '');

      setPopupTextFontFamily(settings?.popupTextFontFamily ?? '');

      setPopupTextBackgroundColor(settings?.popupTextBackgroundColor ?? '');

      // =========================
      // GLOW BORDER
      // =========================

      setGlowBorderRotationSpeed(settings?.glowBorderRotationSpeed ?? '');

      // =========================
      // CAMERA
      // =========================

      setSmallScreen(settings?.smallScreen ?? '');

      setBigScreen(settings?.bigScreen ?? '');

      setCameraPosition(settings?.cameraPosition ?? '');

      // =========================
      // BRAND ENGINE TILT
      // =========================

      setBrandEngineTiltSmallScreen(settings?.brandEngineTiltSmallScreen ?? '');

      setBrandEngineTiltMediumScreen(
        settings?.brandEngineTiltMediumScreen ?? '',
      );

      setBrandEngineTiltBigScreen(settings?.brandEngineTiltBigScreen ?? '');

      // =========================
      // VIEW DISPLAY HEIGHT
      // =========================

      setViewDisplayHeightSmallScreen(
        settings?.viewDisplayHeightSmallScreen ?? '',
      );

      setViewDisplayHeightMediumScreen(
        settings?.viewDisplayHeightMediumScreen ?? '',
      );

      setViewDisplayHeightBigScreen(settings?.viewDisplayHeightBigScreen ?? '');

      // =========================
      // SPIN CONTAINER
      // =========================

      setSpinConHeightSmallScreen(settings?.spinConHeightSmallScreen ?? '');

      setSpinConHeightMediumScreen(settings?.spinConHeightMediumScreen ?? '');

      setSpinConHeightBigScreen(settings?.spinConHeightBigScreen ?? '');

      setVisibleAngleGreater(settings?.visibleAngleGreater ?? '');
      setVisibleAngleLess(settings?.visibleAngleLess ?? '');

      setInitial360RotationY(settings?.initial360RotationY ?? '');

      setFlyingAssetTiltX(settings?.flyingAssetTiltX ?? '');
      setFlyingAssetTiltY(settings?.flyingAssetTiltY ?? '');
      setFlyingAssetTiltZ(settings?.flyingAssetTiltZ ?? '');
      setFlyingAssetHoverSpeed(settings?.flyingAssetHoverSpeed ?? '');

      setFlyingAssetHoverHeightMin(settings?.flyingAssetHoverHeightMin ?? '');

      setFlyingAssetHoverHeightMax(settings?.flyingAssetHoverHeightMax ?? '');

      setAppType(settings?.appType ?? '');

      setBandwidthCount(settings?.bandwidthCount ?? 0);
      setBandwidthExpiresAt(settings?.bandwidthExpiresAt ?? null);
      setIsPaid(settings?.isPaid ?? false);

      setTotalUsers(settings.totalUsers || 0);
      setPaidUsers(settings.paidUsers || 0);
      setAdminUsers(settings.adminUsers || 0);
    } catch (err) {
      console.log('❌ FETCH CAROUSEL ERROR:', err);
    }
  };
  useEffect(() => {
    if (user?._id) fetchCarousel();
  }, [user]);

  // =========================
  // HANDLE FILE CHANGE
  // =========================

  //max file size
  const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 10 MB
  const MAX_LOADINGVIDEO_SIZE = 4 * 1024 * 1024; // 4 MB
  const MAX_IMAGE_SIZE = 300 * 1024; // 300 KB
  const MAX_HDRI_SIZE = 2 * 1024 * 1024; // 2 MB
  const MAX_360PIC4K_SIZE = 1.5 * 1024 * 1024; // 1.5MB
  const MAX_360PIC8K_SIZE = 3 * 1024 * 1024; // 3 MB
  const MAX_MUSIC_SIZE = 4 * 1024 * 1024; // 4 MB

  const MAX_GLB_SIZE = 10 * 1024 * 1024; // 10MB
  const handleChange = (e) => {
    const { name, files } = e.target;
    const file = files?.[0];

    // Maximum 8 uploads
    if (name === 'images') {
      const total = images.length + files.length;

      if (total > 8) {
        toast.error('Maximum of 8 images allowed.');
        e.target.value = null;
        return;
      }
    }

    if (name === 'videos') {
      const total = videos.length + files.length;

      if (total > 8) {
        toast.error('Maximum of 8 videos allowed.');
        e.target.value = null;
        return;
      }
    }

    if (name === 'posterImages') {
      const total = posterImages.length + files.length;

      if (total > 8) {
        toast.error('Maximum of 8 poster images allowed.');
        e.target.value = null;
        return;
      }
    }

    // Maximum 1 upload
    if (name === 'loadingVideo' && loadingVideo) {
      toast.error('Only one loading video is allowed.');
      e.target.value = null;
      return;
    }

    if (name === 'model3D' && model3D) {
      toast.error('Only one 3D model is allowed.');
      e.target.value = null;
      return;
    }

    if (name === 'image360' && image360) {
      toast.error('Only one 360  image is allowed.');
      e.target.value = null;
      return;
    }

    if (name === 'image3608k' && image3608k) {
      toast.error('Only one 360 8k image is allowed.');
      e.target.value = null;
      return;
    }

    if (name === 'music' && music) {
      toast.error('Only one music file is allowed.');
      e.target.value = null;
      return;
    }

    if (name === 'hdri' && hdri) {
      toast.error('Only one HDRI is allowed.');
      e.target.value = null;
      return;
    }

    if (!file) return;

    // =========================
    // FILE SIZE LIMITS
    // =========================

    // Videos (6 MB)
    if (name === 'videos') {
      if (file.size > MAX_VIDEO_SIZE) {
        toast.error('Maximum video size is 10 MB.');
        e.target.value = null;
        return;
      }
    }

    // Images (300 KB)
    if (name === 'images' || name === 'posterImages') {
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error('Maximum image size is 300 KB.');
        e.target.value = null;
        return;
      }
    }

    // HDRI (2 MB)
    if (name === 'hdri') {
      if (file.size > MAX_HDRI_SIZE) {
        toast.error('Maximum HDRI size is 2 MB.');
        e.target.value = null;
        return;
      }
    }

    // Loading video (4 MB)
    if (name === 'loadingVideo') {
      if (file.size > MAX_LOADINGVIDEO_SIZE) {
        toast.error('Maximum loadingVideo size is 4 MB.');
        e.target.value = null;
        return;
      }
    }

    // music (3 MB)
    if (name === 'music') {
      if (file.size > MAX_MUSIC_SIZE) {
        toast.error('Maximum music size is 4 MB.');
        e.target.value = null;
        return;
      }
    }

    // 3d model (2 MB)
    if (name === 'model3D') {
      if (file.size > MAX_GLB_SIZE) {
        toast.error('Maximum 3d model size is 10 MB.');
        e.target.value = null;
        return;
      }
    }

    // 360 image 4k (1 MB)
    if (name === 'image360') {
      if (file.size > MAX_360PIC4K_SIZE) {
        toast.error('Maximum 360pic size is 1.5 MB.');
        e.target.value = null;
        return;
      }
    }

    // 360 image 8k (2 MB)
    if (name === 'image3608k') {
      if (file.size > MAX_360PIC8K_SIZE) {
        toast.error('Maximum 360pic 8k size is 3 MB.');
        e.target.value = null;
        return;
      }
    }

    //handling change
    if (name === 'images' || name === 'videos' || name === 'posterImages') {
      setFiles((prev) => ({
        ...prev,
        [name]: files,
      }));
    }

    if (name === 'loadingVideo') setLoadingVideo(file);
    if (name === 'image360') setImage360(file);
    if (name === 'image3608k') setImage3608k(file);
    if (name === 'model3D') setModel3D(file);
    if (name === 'music') setMusic(file);
    if (name === 'hdri') setHdri(file);
  };

  //getting file name from link string
  const getFileName = (url) => {
    if (!url) return '';

    return url.split('/').pop().split('?')[0];
  };

  // =========================
  // UPLOAD TO R2 + DB
  // =========================
  const handleUpload = async () => {
    try {
      const formData = new FormData();

      // formData.append('userId', user._id);

      //fetching the target helper way
      const cleanTargetUserName = targetUserName.trim();

      if (cleanTargetUserName) {
        formData.append('targetUserName', cleanTargetUserName);
      }

      // arrays
      Object.keys(files).forEach((key) => {
        Array.from(files[key] || []).forEach((file) => {
          formData.append(key, file);
        });
      });

      // SINGLE FILES
      if (loadingVideo) {
        formData.append('loadingVideo', loadingVideo);
      }

      if (image360) {
        formData.append('image360', image360);
      }

      if (image3608k) {
        formData.append('image3608k', image3608k);
      }
      if (model3D) {
        formData.append('model3D', model3D);
      }

      if (music) {
        formData.append('music', music);
      }

      if (hdri) {
        formData.append('hdri', hdri);
      }

      // 🔥 UPLOAD STARTS
      setUploading(true);

      setUploadProgress(0);
      await axios.post(`${API}/upload-carousel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );

          setUploadProgress(percent);
        },
      });

      toast.success('Uploaded successfully 🚀');

      // 🔥 REFRESH DATA WITHOUT RELOAD
      // await fetchCarousel();
      await fetchCarousel(cleanTargetUserName);
      //  clearing selected files
      resetInputs();
      setFiles({});
    } catch (err) {
      console.log('🔴 UPLOAD ERROR:', err);

      console.log('🔴 SERVER RESPONSE:', err.response?.data);

      toast.error(err.response?.data?.error || 'Upload failed');
    } finally {
      setUploading(false);
      setUploadingType(null);
      setUploadProgress(0);
    }
  };

  // =========================
  // DRAG & REORDER
  // =========================

  const saveReorder = async (type, newData) => {
    // try {
    //   await axios.put(`${API}/carousel/reorder`, {
    //     userId: user._id,
    //     type,
    //     data: newData,
    //   });
    try {
      const cleanTargetUserName = targetUserName.trim();

      await axios.put(`${API}/carousel/reorder`, {
        ...(cleanTargetUserName && {
          targetUserName: cleanTargetUserName,
        }),
        type,
        data: newData,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDragEnd = (type) => (event) => {
    const { active, over } = event;

    if (!over) return;

    const listMap = {
      images,
      videos,
      posterImages,
    };

    const setters = {
      images: setImages,
      videos: setVideos,
      posterImages: setPosterImages,
    };

    const items = listMap[type];

    const oldIndex = Number(active.id);
    const newIndex = Number(over.id);

    if (oldIndex === newIndex) return;

    const newOrder = arrayMove(items, oldIndex, newIndex);

    setters[type](newOrder);

    saveReorder(type, newOrder);
  };

  // =========================
  // AUTO SAVE (DEBOUNCED)
  // =========================

  // =========================
  // DELETE IMAGE
  // =========================

  //deleting multiple file
  const deleteFile = async (type, url) => {
    try {
      // const res = await axios.delete(`${API}/carousel/image`, {
      //   data: {
      //     userId: user._id,
      //     imageUrl: url,
      //     type,
      //   },
      // });

      // console.log('🟢 DELETE RESPONSE:', res.data);
      const cleanTargetUserName = targetUserName.trim();

      const res = await axios.delete(`${API}/carousel/image`, {
        data: {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          imageUrl: url,
          type,
        },
      });
      // update frontend instantly
      if (type === 'images') {
        setImages((prev) => prev.filter((i) => i !== url));
      }

      if (type === 'videos') {
        setVideos((prev) => prev.filter((i) => i !== url));
      }

      if (type === 'posterImages') {
        setPosterImages((prev) => prev.filter((i) => i !== url));
      }

      toast.success('Deleted successfully');
    } catch (err) {
      console.log('🔴 DELETE ERROR:', err);

      console.log('🔴 SERVER RESPONSE:', err?.response?.data);

      toast.error(
        err?.response?.data?.error || 'Delete failed. Check console.',
      );
    }
  };

  //Delete single file
  const deleteSingleFile = async (field) => {
    try {
      // await axios.delete(`${API}/carousel/single`, {
      //   data: {
      //     userId: user._id,
      //     field,
      //   },
      // });
      const cleanTargetUserName = targetUserName.trim();

      await axios.delete(`${API}/carousel/single`, {
        data: {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          field,
        },
      });
      if (field === 'loadingVideo') setLoadingVideo(null);
      if (field === 'model3D') setModel3D(null);
      if (field === 'image360') setImage360(null);
      if (field === 'image3608k') setImage3608k(null);
      if (field === 'music') setMusic(null);
      if (field === 'hdri') setHdri(null);
    } catch (err) {
      console.log(err);
    }
  };

  // save video settings
  const saveVideoSettings = async () => {
    try {
      //   const res = await axios.put(`${API}/carousel/video-settings`, {
      //     userId: user._id,
      //     videoRadius,
      //     videoGlow,
      //     videoSizeSmallScreen,
      //     videoSizeBigScreen,
      //     hoverGlow,
      //   });

      //   alert('Settings saved');

      //   await fetchCarousel();
      const cleanTargetUserName = targetUserName.trim();

      const res = await axios.put(`${API}/carousel/video-settings`, {
        ...(cleanTargetUserName && {
          targetUserName: cleanTargetUserName,
        }),
        videoRadius,
        videoGlow,
        videoSizeSmallScreen,
        videoSizeBigScreen,
        hoverGlow,
        autoPlayVideo: Number(autoVideoPlay),
      });

      toast.success('Settings saved');

      await fetchCarousel(cleanTargetUserName);
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to save settings');
    }
  };

  // save image settings
  const saveImageSettings = async () => {
    try {
      // const res = await axios.put(`${API}/carousel/image-settings`, {
      //   userId: user._id,
      //   imageRadius,
      //   imageGlow,
      //   imageSizeSmallScreen,
      //   imageSizeBigScreen,
      //   imageHoverGlow,
      // });

      // alert('Settings saved');

      // await fetchCarousel();
      const cleanTargetUserName = targetUserName.trim();

      const res = await axios.put(`${API}/carousel/image-settings`, {
        ...(cleanTargetUserName && {
          targetUserName: cleanTargetUserName,
        }),
        imageRadius,
        imageGlow,
        imageSizeSmallScreen,
        imageSizeBigScreen,
        imageHoverGlow,
      });

      toast.success('Settings saved');

      await fetchCarousel(cleanTargetUserName);
    } catch (err) {
      toast.error(err?.response?.data?.error || 'Failed to save settings');
    }
  };

  //delete video settings
  const deleteVideoSettings = async () => {
    try {
      // await axios.delete(`${API}/carousel/video-settings`, {
      //   data: {
      //     userId: user._id,
      //   },
      // });
      const cleanTargetUserName = targetUserName.trim();

      await axios.delete(`${API}/carousel/video-settings`, {
        data: {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
        },
      });

      setVideoRadius('');
      setVideoGlow([]);
      setVideoSizeSmallScreen('');
      setVideoSizeBigScreen('');
      setHoverGlow('');

      toast.success('Settings deleted');
    } catch (err) {
      console.log(err);
    }
  };

  // save video settings
  const videoSettingSave = async () => {
    await saveVideoSettings();
  };

  //delete image settings
  const deleteImageSettings = async () => {
    try {
      // await axios.delete(`${API}/carousel/image-settings`, {
      //   data: {
      //     userId: user._id,
      //   },
      // });
      const cleanTargetUserName = targetUserName.trim();

      await axios.delete(`${API}/carousel/image-settings`, {
        data: {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
        },
      });

      setImageRadius('');
      setImageGlow([]);
      setImageSizeSmallScreen('');
      setImageSizeBigScreen('');
      setImageHoverGlow('');

      toast.success('Settings deleted');
    } catch (err) {
      console.log(err);
    }
  };

  // save image setting
  const imageSettingSave = async () => {
    await saveImageSettings();
  };

  //remove image glow color settings
  const removeGlowImage = (index) => {
    setImageGlow((prev) => prev.filter((_, i) => i !== index));
  };

  //remove image glow color settings
  const removeGlowVideo = (index) => {
    setVideoGlow((prev) => prev.filter((_, i) => i !== index));
  };

  // =========================================================
  // VALIDATION HELPERS
  // =========================================================
  const isPositionString = (value) => {
    if (typeof value !== 'string') {
      return false;
    }

    return /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(
      value.trim(),
    );
  };

  const isValidNumber = (value) => {
    if (value === '' || value === null || value === undefined) {
      return false;
    }

    return Number.isFinite(Number(value));
  };

  const isValidWholeNumber = (value) => {
    if (value === '' || value === null || value === undefined) {
      return false;
    }

    return /^\d+$/.test(String(value));
  };

  const isValidDecimalOrWhole = (value) => {
    if (value === '' || value === null || value === undefined) {
      return false;
    }

    return /^-?\d+(\.\d+)?$/.test(String(value));
  };

  const isValidColor = (value) => {
    if (!value) return false;

    const color = new Option().style;

    color.color = value;

    return color.color !== '';
  };

  const isValidWebsite = (value) => {
    try {
      const url = new URL(value);

      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const isValidDomain = (value) => {
    if (typeof value !== 'string') {
      return false;
    }

    const domain = value.trim().toLowerCase();

    // Allow localhost with optional port
    // if (/^https?:\/\/localhost(?::\d{1,5})?$/.test(domain)) {
    //   return true;
    // }

    try {
      const url = new URL(domain);

      // Only allow HTTP or HTTPS
      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return false;
      }

      // // Must have a hostname
      // if (!url.hostname) {
      //   return false;
      // }

      // // Don't allow paths
      // if (url.pathname !== '/') {
      //   return false;
      // }

      // // Don't allow query strings or hashes
      // if (url.search || url.hash) {
      //   return false;
      // }

      return true;
    } catch {
      return false;
    }
  };

  const isValidThreePosition = (value) => {
    if (!value) return false;

    const parts = value.split(',').map((item) => item.trim());

    if (parts.length !== 3) {
      return false;
    }

    return parts.every((item) => /^-?\d+(\.\d+)?$/.test(item));
  };

  const isValidDegree = (value) => {
    if (value === '' || value === null || value === undefined) {
      return false;
    }

    return /^-?\d+(\.\d+)?$/.test(value);
  };

  const removeLogoGlow = (index) => {
    setLogoGlowColors((prev) => prev.filter((_, i) => i !== index));
  };

  const addLogoGlowColor = () => {
    if (!isValidColor(selectedLogoGlow)) {
      return;
    }

    if (logoGlowColors.length >= 3) {
      toast.error('Maximum of 3 logo glow colors allowed.');
      return;
    }

    setLogoGlowColors((prev) => [...prev, selectedLogoGlow]);
  };

  const handleBuyNowFontChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      'font/ttf',
      'font/otf',
      'font/woff',
      'font/woff2',
      'application/font-woff',
      'application/font-woff2',
    ];

    const extension = file.name.split('.').pop().toLowerCase();

    const allowedExtensions = ['ttf', 'otf', 'woff', 'woff2'];

    if (
      !allowedTypes.includes(file.type) &&
      !allowedExtensions.includes(extension)
    ) {
      toast.error('Only TTF, OTF, WOFF or WOFF2 font files are allowed.');
      e.target.value = '';
      return;
    }

    setBuyNowButtonFontFamily(file);
  };

  const handleLogoFontChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const extension = file.name.split('.').pop().toLowerCase();

    const allowedExtensions = ['ttf', 'otf', 'woff', 'woff2'];

    if (!allowedExtensions.includes(extension)) {
      toast.error('Only TTF, OTF, WOFF or WOFF2 font files are allowed.');
      e.target.value = '';
      return;
    }

    setLogoFontFamily(file);
  };

  const handlePopupFontChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const extension = file.name.split('.').pop().toLowerCase();

    const allowedExtensions = ['ttf', 'otf', 'woff', 'woff2'];

    if (!allowedExtensions.includes(extension)) {
      toast.error('Only TTF, OTF, WOFF or WOFF2 font files are allowed.');
      e.target.value = '';
      return;
    }

    setPopupTextFontFamily(file);
  };

  const userNameSettingSave = async () => {
    try {
      if (!userNameInput || !userNameInput.trim()) {
        toast.error('Username is required.');
        return;
      }

      // const cleanUserName = userNameInput.trim();

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      //     userName: cleanUserName,
      //   },
      //   {
      //     withCredentials: true,
      //   },
      // );
      const cleanUserName = userNameInput.trim();
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          userName: cleanUserName,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        setSavedUserName(cleanUserName); // updates display
        setUserNameInput(''); // clears the input
        toast.success('Username saved successfully.');
      } else {
        toast.error(
          response.data?.error ||
            response.data?.message ||
            'Failed to save username.',
        );
      }
    } catch (error) {
      console.error('Username save error:', error.response?.data || error);

      if (error.response?.status === 409) {
        toast.error(
          'That username is already taken. Please choose another one.',
        );
        return;
      }

      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Failed to save username.',
      );
    }
  };
  const buyNowButtonSettingSave = async () => {
    try {
      if (!buyNowButtonText.trim()) {
        toast.error('Buy Now button text is required.');
        return;
      }

      if (
        !Array.isArray(buyNowButtonlink) ||
        buyNowButtonlink.length < 1 ||
        buyNowButtonlink.length > 8
      ) {
        toast.error('Buy Now links must contain between 1 and 8 links.');
        return;
      }

      for (const link of buyNowButtonlink) {
        if (!isValidWebsite(link)) {
          toast.error(`Invalid Buy Now link: ${link}`);
          return;
        }
      }

      if (!isValidColor(buyNowButtonBackgroundColor)) {
        toast.error('Invalid Buy Now background color.');
        return;
      }

      if (!isValidColor(buyNowButtonTextColor)) {
        toast.error('Invalid Buy Now text color.');
        return;
      }

      if (!isValidNumber(buyNowButtonRadius)) {
        toast.error('Buy Now radius must be a number.');
        return;
      }

      if (!isValidColor(buyNowButtonHoverBGColor)) {
        toast.error('Invalid Buy Now hover background color.');
        return;
      }

      if (!isValidColor(buyNowButtonHoverTextColor)) {
        toast.error('Invalid Buy Now hover text color.');
        return;
      }

      if (!isValidNumber(buyNowButtonHeightSmallScreen)) {
        toast.error(
          'Buy Now button height for small screens must be a number.',
        );
        return;
      }

      if (!isValidNumber(buyNowButtonHeightMediumScreen)) {
        toast.error(
          'Buy Now button height for medium screens must be a number.',
        );
        return;
      }

      if (!isValidNumber(buyNowButtonHeightBigScreen)) {
        toast.error('Buy Now button height for big screens must be a number.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          buyNowButtonText: buyNowButtonText.trim(),

          buyNowButtonlink: buyNowButtonlink.map((link) => link.trim()),

          buyNowButtonBackgroundColor,

          buyNowButtonTextColor,

          buyNowButtonRadius,

          buyNowButtonFontSize,

          buyNowButtonHoverBGColor,

          buyNowButtonHoverTextColor,

          buyNowButtonFontFamily,

          // NEW
          buyNowButtonHeightSmallScreen,
          buyNowButtonHeightMediumScreen,
          buyNowButtonHeightBigScreen,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Buy Now settings saved successfully.');
      } else {
        toast.error(
          response.data?.message || 'Failed to save Buy Now settings.',
        );
      }
    } catch (error) {
      console.error('Buy Now settings error:', error);

      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Failed to save Buy Now settings.',
      );
    }
  };

  const musicButtonSettingSave = async () => {
    try {
      if (!isValidColor(musicButtonGlowColor)) {
        toast.error('Invalid music button glow color.');
        return;
      }

      if (!isValidColor(musicButtonBackGroundColor)) {
        toast.error('Invalid music button background color.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   { userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          musicButtonGlowColor,
          musicButtonBackGroundColor,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Music button settings saved successfully.');
      } else {
        toast.error(
          response.data?.message || 'Failed to save music button settings.',
        );
      }
    } catch (error) {
      console.error('Music button settings error:', error);

      toast.error(
        error.response?.data?.message ||
          'Failed to save music button settings.',
      );
    }
  };

  const freezeButtonSettingSave = async () => {
    try {
      if (!isValidColor(freezeButtonGlowColor)) {
        toast.error('Invalid freeze button glow color.');
        return;
      }

      if (!isValidColor(freezeButtonBackgroundColor)) {
        toast.error('Invalid freeze button background color.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          freezeButtonGlowColor,
          freezeButtonBackgroundColor,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Freeze button settings saved successfully.');
      } else {
        toast.error(
          response.data?.message || 'Failed to save freeze button settings.',
        );
      }
    } catch (error) {
      console.error('Freeze button settings error:', error);

      toast.error(
        error.response?.data?.message ||
          'Failed to save freeze button settings.',
      );
    }
  };

  const atributionSettingSave = async () => {
    try {
      // if (!atributionText.trim()) {
      //   alert('Attribution text is required.');
      //   return;
      // }

      // if (!isValidWebsite(atributionLink)) {
      //   alert('Please enter a valid attribution link.');
      //   return;
      // }

      if (!isValidColor(atributionBulbGlowColor)) {
        toast.error('Invalid attribution bulb glow color.');
        return;
      }

      if (!isValidColor(atributionBackgroundColor)) {
        toast.error('Invalid attribution background color.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          atributionText: atributionText.trim(),
          atributionLink: atributionLink.trim(),
          atributionBulbGlowColor,
          atributionBackgroundColor,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Attribution settings saved successfully.');
      } else {
        toast.error(
          response.data?.message || 'Failed to save attribution settings.',
        );
      }
    } catch (error) {
      console.error('Attribution settings error:', error);

      toast.error(
        error.response?.data?.message || 'Failed to save attribution settings.',
      );
    }
  };

  const glbSettingSave = async () => {
    try {
      const modelValues = [
        ['Tiny screen model size', modelSizeTinyScreen],
        ['Small screen model size', modelSizeSmallScreen],
        ['Medium screen model size', modelSizeMediumScreen],
        ['Big screen model size', modelSizeBigScreen],
        ['Model roughness', modelRoughness],
        ['Model metalness', modelMetalness],
        ['Model environment intensity', modelEnvMapIntensity],
        ['Model animation speed', modelAnimationSpeed],
      ];

      for (const [name, value] of modelValues) {
        if (!isValidDecimalOrWhole(value)) {
          toast.error(`${name} must be a valid number.`);
          return;
        }
      }

      if (!isPositionString(modelPosition)) {
        toast.error('Model position must be in the format X, Y, Z.');
        return;
      }

      if (!isPositionString(modelPositionMedium)) {
        toast.error('Model position medium must be in the format X, Y, Z.');
        return;
      }

      if (!isPositionString(modelPositionBig)) {
        toast.error('Model position big must be in the format X, Y, Z.');
        return;
      }

      if (!isValidDecimalOrWhole(modelRotation)) {
        toast.error('Model rotation must be a valid number.');
        return;
      }

      if (!isValidDecimalOrWhole(modelRotationX)) {
        toast.error('Model rotation X must be a valid number.');
        return;
      }

      if (!isValidDecimalOrWhole(modelRotationZ)) {
        toast.error('Model rotation Z must be a valid number.');
        return;
      }
      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          modelSizeTinyScreen: Number(modelSizeTinyScreen),
          modelSizeSmallScreen: Number(modelSizeSmallScreen),
          modelSizeMediumScreen: Number(modelSizeMediumScreen),
          modelSizeBigScreen: Number(modelSizeBigScreen),

          modelRoughness: Number(modelRoughness),
          modelMetalness: Number(modelMetalness),
          modelEnvMapIntensity: Number(modelEnvMapIntensity),
          modelAnimationSpeed: Number(modelAnimationSpeed),
          modelPosition: modelPosition.trim(),
          modelPositionMedium: modelPositionMedium.trim(),
          modelPositionBig: modelPositionBig.trim(),
          // 🎨 Model repaint color
          modelRepaintColor: modelRepaintColor.trim() || null,
          modelRotation: Number(modelRotation),
          modelRotationX: Number(modelRotationX),
          modelRotationZ: Number(modelRotationZ),
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('GLB settings saved successfully.');
      } else {
        toast.error(response.data?.message || 'Failed to save GLB settings.');
      }
    } catch (error) {
      console.error('GLB settings error:', error);

      toast.error(
        error.response?.data?.message || 'Failed to save GLB settings.',
      );
    }
  };

  const carouselControlSettingSave = async () => {
    try {
      if (!isValidDecimalOrWhole(carouselRadius)) {
        toast.error('Carousel radius must be a valid number.');
        return;
      }

      if (
        rotationSpeed === '' ||
        !/^-?\d+(\.\d+)?$/.test(String(rotationSpeed))
      ) {
        toast.error('Rotation speed must be a valid number.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          rotationSpeed: String(rotationSpeed),
          carouselRadius: Number(carouselRadius),
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Carousel settings saved successfully.');
      } else {
        toast.error(
          response.data?.message || 'Failed to save carousel settings.',
        );
      }
    } catch (error) {
      console.error('Carousel settings error:', error);

      toast.error(
        error.response?.data?.message || 'Failed to save carousel settings.',
      );
    }
  };

  const hdriSettingSave = async () => {
    try {
      if (!isValidDecimalOrWhole(hdriBrigthness)) {
        toast.error('HDRI brightness must be a valid number.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   { userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          hdriBrigthness: Number(hdriBrigthness),
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('HDRI settings saved successfully.');
      } else {
        toast.error(response.data?.message || 'Failed to save HDRI settings.');
      }
    } catch (error) {
      console.error('HDRI settings error:', error);

      toast.error(
        error.response?.data?.message || 'Failed to save HDRI settings.',
      );
    }
  };
  const popupSettingSave = async () => {
    try {
      // if (!popupText.trim()) {
      //   alert('Popup text is required.');
      //   return;
      // }

      if (!isValidColor(popupTextColor)) {
        toast.error('Invalid popup text color.');
        return;
      }

      if (!isValidColor(popupTextBackgroundColor)) {
        toast.error('Invalid popup background color.');
        return;
      }

      if (!isValidNumber(popupTextSize)) {
        toast.error('Invalid popup text size.');
        return;
      }
      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          popupText: popupText.trim(),

          popupTextSize: popupTextSize,

          popupTextColor: popupTextColor,

          popupTextBackgroundColor: popupTextBackgroundColor,

          popupTextFontFamily: popupTextFontFamily || null,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Popup settings saved successfully.');
      } else {
        toast.error(response.data?.message || 'Failed to save popup settings.');
      }
    } catch (error) {
      console.error('Popup settings error:', error);

      toast.error(
        error.response?.data?.message || 'Failed to save popup settings.',
      );
    }
  };

  const glowBorderSettingSave = async () => {
    try {
      if (!isValidWholeNumber(glowBorderRotationSpeed)) {
        toast.error('Glow border rotation speed must be a whole number.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          glowBorderRotationSpeed: Number(glowBorderRotationSpeed),
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Glow border setting saved successfully.');
      } else {
        toast.error(
          response.data?.message || 'Failed to save glow border setting.',
        );
      }
    } catch (error) {
      console.error('Glow border settings error:', error);

      toast.error(
        error.response?.data?.message || 'Failed to save glow border setting.',
      );
    }
  };

  const allowedDomainSettingSave = async () => {
    try {
      const cleanDomain = allowedDomain.trim().toLowerCase();

      if (!isValidDomain(cleanDomain)) {
        toast.error('Enter a valid domain such as https://example.com');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          allowedDomain: cleanDomain,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Allowed domain saved successfully.');
      } else {
        toast.error(response.data?.message || 'Failed to save allowed domain.');
      }
    } catch (error) {
      console.error('Allowed domain error:', error);

      toast.error(
        error.response?.data?.message || 'Failed to save allowed domain.',
      );
    }
  };

  const tiltSettingSave = async () => {
    try {
      if (!isValidDegree(brandEngineTiltSmallScreen)) {
        toast.error('Small screen tilt must be a valid number.');
        return;
      }

      if (!isValidDegree(brandEngineTiltMediumScreen)) {
        toast.error('Medium screen tilt must be a valid number.');
        return;
      }

      if (!isValidDegree(brandEngineTiltBigScreen)) {
        toast.error('Big screen tilt must be a valid number.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          brandEngineTiltSmallScreen: Number(brandEngineTiltSmallScreen),

          brandEngineTiltMediumScreen: Number(brandEngineTiltMediumScreen),

          brandEngineTiltBigScreen: Number(brandEngineTiltBigScreen),
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Tilt settings saved successfully.');
      } else {
        toast.error(response.data?.message || 'Failed to save tilt settings.');
      }
    } catch (error) {
      console.error('Tilt settings error:', error);

      toast.error(
        error.response?.data?.message || 'Failed to save tilt settings.',
      );
    }
  };

  const contactInfoSettingSave = async () => {
    try {
      if (!contactInfo.trim()) {
        toast.error('Contact information is required.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   { userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          contactInfo: contactInfo.trim(),
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Contact information saved successfully.');
      } else {
        toast.error(
          response.data?.message || 'Failed to save contact information.',
        );
      }
    } catch (error) {
      console.error('Contact info error:', error);

      toast.error(
        error.response?.data?.message || 'Failed to save contact information.',
      );
    }
  };

  const viewDisplayHeightSettingSave = async () => {
    try {
      if (!isValidNumber(viewDisplayHeightSmallScreen)) {
        toast.error('Small screen view display height must be a number.');
        return;
      }

      if (!isValidNumber(viewDisplayHeightMediumScreen)) {
        toast.error('Medium screen view display height must be a number.');
        return;
      }

      if (!isValidNumber(viewDisplayHeightBigScreen)) {
        toast.error('Big screen view display height must be a number.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),

          viewDisplayHeightSmallScreen: Number(viewDisplayHeightSmallScreen),

          viewDisplayHeightMediumScreen: Number(viewDisplayHeightMediumScreen),

          viewDisplayHeightBigScreen: Number(viewDisplayHeightBigScreen),
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('View display height settings saved successfully.');
      } else {
        toast.error(
          response.data?.message ||
            'Failed to save view display height settings.',
        );
      }
    } catch (error) {
      console.error('❌ VIEW HEIGHT STATUS:', error.response?.status);
      console.error('❌ VIEW HEIGHT BACKEND:', error.response?.data);
      console.error('❌ FULL ERROR:', error);

      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Failed to save view display height settings.',
      );
    }
  };
  const spinContainerHeightSettingSave = async () => {
    try {
      if (!isValidWholeNumber(spinConHeightSmallScreen)) {
        toast.error('Small screen spin height must be a whole number.');
        return;
      }

      if (!isValidWholeNumber(spinConHeightMediumScreen)) {
        toast.error('Medium screen spin height must be a whole number.');
        return;
      }

      if (!isValidWholeNumber(spinConHeightBigScreen)) {
        toast.error('Big screen spin height must be a whole number.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          spinConHeightSmallScreen: Number(spinConHeightSmallScreen),

          spinConHeightMediumScreen: Number(spinConHeightMediumScreen),

          spinConHeightBigScreen: Number(spinConHeightBigScreen),
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Spin container heights saved successfully.');
      } else {
        toast.error(
          response.data?.message || 'Failed to save spin container heights.',
        );
      }
    } catch (error) {
      console.error('Spin container height error:', error);

      toast.error(
        error.response?.data?.message ||
          'Failed to save spin container heights.',
      );
    }
  };

  const logoSettingSave = async () => {
    try {
      if (!isValidNumber(logoFontSizeSmallScreen)) {
        toast.error('Small screen logo size must be a number.');
        return;
      }

      if (!isValidNumber(logoFontSizeMediumScreen)) {
        toast.error('Medium screen logo size must be a number.');
        return;
      }

      if (!isValidNumber(logoFontSizeBigScreen)) {
        toast.error('Big screen logo size must be a number.');
        return;
      }

      if (!isValidNumber(logoVerticalHeight)) {
        toast.error('Logo vertical height must be a number.');
        return;
      }

      if (logoGlowColors.length > 3) {
        toast.error('Maximum of 3 logo glow colors allowed.');
        return;
      }

      for (const color of logoGlowColors) {
        if (!isValidColor(color)) {
          toast.error('Invalid logo glow color.');
          return;
        }
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          logoFontSizeSmallScreen: Number(logoFontSizeSmallScreen),

          logoFontSizeMediumScreen: Number(logoFontSizeMediumScreen),

          logoFontSizeBigScreen: Number(logoFontSizeBigScreen),

          logoGlowColors,
          logoText: logoText.trim(),

          logoVerticalHeight: Number(logoVerticalHeight),
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Logo settings saved successfully.');
      } else {
        toast.error(response.data?.message || 'Failed to save logo settings.');
      }
    } catch (error) {
      console.error('Logo error:', error);

      toast.error(
        error.response?.data?.message || 'Failed to save logo settings.',
      );
    }
  };

  const uploadFont = async (file, fieldName) => {
    if (!file) return;

    // =========================
    // FONT TYPE CHECK
    // =========================

    const fileName = file.name.toLowerCase();

    const allowedFontExtensions = ['.ttf', '.otf', '.woff', '.woff2'];

    const isValidFont = allowedFontExtensions.some((extension) =>
      fileName.endsWith(extension),
    );

    if (!isValidFont) {
      toast.error(
        'Please select a valid font file (.ttf, .otf, .woff, or .woff2).',
      );
      return;
    }

    // =========================
    // FONT SIZE CHECK
    // =========================

    const MAX_FONT_SIZE = 2 * 1024 * 1024;

    if (file.size > MAX_FONT_SIZE) {
      toast.error('Font file must be under 2 MB.');
      return;
    }

    // =========================
    // FORMDATA
    // =========================

    // const formData = new FormData();
    // formData.append('userId', user._id);

    // formData.append(fieldName, file);
    const formData = new FormData();

    const cleanTargetUserName = targetUserName.trim();

    if (cleanTargetUserName) {
      formData.append('targetUserName', cleanTargetUserName);
    }

    formData.append(fieldName, file);

    try {
      setFontUploading(true);

      const response = await axios.post(`${API}/upload-carousel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // =========================
      // UPDATE FRONTEND STATE
      // =========================

      if (fieldName === 'buyNowButtonFontFamily') {
        setBuyNowButtonFontFamily(
          response.data.user?.buyNowButtonFontFamily ||
            response.data.buyNowButtonFontFamily ||
            null,
        );
      }

      if (fieldName === 'logoFontFamily') {
        setLogoFontFamily(
          response.data.user?.logoFontFamily ||
            response.data.logoFontFamily ||
            null,
        );
      }

      if (fieldName === 'popupTextFontFamily') {
        setPopupTextFontFamily(
          response.data.user?.popupTextFontFamily ||
            response.data.popupTextFontFamily ||
            null,
        );
      }

      toast.success('Font uploaded successfully.');
    } catch (error) {
      console.error('❌ FONT UPLOAD ERROR:', error);

      toast.error(error.response?.data?.error || 'Font upload failed.');
    } finally {
      setFontUploading(false);
    }
  };

  const appTypeSettingSave = async () => {
    try {
      if (!appType) {
        toast.error('Please select an app type.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          appType: appType,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('App Type saved successfully.');
      } else {
        toast.error(response.data?.message || 'Failed to save App Type.');
      }
    } catch (error) {
      console.error('App Type save error:', error);

      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Failed to update app type',
      );
    }
  };

  const embedTypeSettingSave = async () => {
    try {
      if (!embedType) {
        toast.error('Please select a platform.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          embedType: embedType,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Platform Embed Type saved successfully.');
      } else {
        toast.error(
          response.data?.message || 'Failed to save Platform Embed Type.',
        );
      }
    } catch (error) {
      console.error('Embed Type save error:', error);

      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          'Failed to update embed type',
      );
    }
  };

  const cameraSettingSave = async () => {
    try {
      if (!isPositionString(cameraPosition)) {
        toast.error('Camera position must be in the format: 0, 0, 0');
        return;
      }

      if (!isValidNumber(smallScreen)) {
        toast.error('Small Screen FOV must be a valid number.');
        return;
      }

      if (!isValidNumber(bigScreen)) {
        toast.error('Big Screen FOV must be a valid number.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          cameraPosition: cameraPosition.trim(),

          smallScreen: Number(smallScreen),

          bigScreen: Number(bigScreen),
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Camera settings saved successfully.');
      } else {
        toast.error(
          response.data?.message || 'Failed to save camera settings.',
        );
      }
    } catch (error) {
      console.error('Camera settings error:', error);

      toast.error(
        error.response?.data?.message || 'Failed to save camera settings.',
      );
    }
  };

  const flyingAssetSave = async () => {
    try {
      if (!isValidDecimalOrWhole(visibleAngleGreater)) {
        toast.error('Visible angle greater must be a valid number.');
        return;
      }

      if (!isValidDecimalOrWhole(visibleAngleLess)) {
        toast.error('Visible angle less must be a valid number.');
        return;
      }

      if (!isValidDecimalOrWhole(flyingAssetTiltX)) {
        toast.error('Flying asset tilt X must be a valid number.');
        return;
      }

      if (!isValidDecimalOrWhole(flyingAssetTiltY)) {
        toast.error('Flying asset tilt Y must be a valid number.');
        return;
      }

      if (!isValidDecimalOrWhole(flyingAssetTiltZ)) {
        toast.error('Flying asset tilt Z must be a valid number.');
        return;
      }

      if (!isValidDecimalOrWhole(flyingAssetHoverSpeed)) {
        toast.error('Flying asset hover speed must be a valid number.');
        return;
      }

      if (!isValidDecimalOrWhole(flyingAssetHoverHeightMin)) {
        toast.error(
          'Flying asset hover height minimum must be a valid number.',
        );
        return;
      }

      if (!isValidDecimalOrWhole(flyingAssetHoverHeightMax)) {
        toast.error(
          'Flying asset hover height maximum must be a valid number.',
        );
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          visibleAngleGreater: Number(visibleAngleGreater),
          visibleAngleLess: Number(visibleAngleLess),
          flyingAssetTiltX: Number(flyingAssetTiltX),
          flyingAssetTiltY: Number(flyingAssetTiltY),
          flyingAssetTiltZ: Number(flyingAssetTiltZ),
          flyingAssetHoverSpeed: Number(flyingAssetHoverSpeed),

          flyingAssetHoverHeightMin: Number(flyingAssetHoverHeightMin),
          flyingAssetHoverHeightMax: Number(flyingAssetHoverHeightMax),
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Flying assets settings saved successfully.');
      } else {
        toast.error(
          response.data?.message || 'Failed to save flying assets settings.',
        );
      }
    } catch (error) {
      console.error('Flying assets settings error:', error);

      toast.error(
        error.response?.data?.message ||
          'Failed to save flying assets settings.',
      );
    }
  };

  const initial360RotationSave = async () => {
    try {
      if (!isValidDecimalOrWhole(initial360RotationY)) {
        toast.error('Initial 360 rotation must be a valid number.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          initial360RotationY: Number(initial360RotationY),
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        toast.success('Initial 360 rotation saved successfully.');
      } else {
        toast.error(
          response.data?.message || 'Failed to save initial 360 rotation.',
        );
      }
    } catch (error) {
      console.error('Initial 360 rotation error:', error);

      toast.error(
        error.response?.data?.message || 'Failed to save initial 360 rotation.',
      );
    }
  };

  const bandwidthSettingSave = async () => {
    try {
      const adjustment = Number(bandwidthAdjustment);

      if (!Number.isFinite(adjustment) || adjustment === 0) {
        toast.error('Enter a valid bandwidth adjustment.');
        return;
      }

      // const response = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const response = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          bandwidthAdjustment: adjustment,
        },
        {
          withCredentials: true,
        },
      );

      if (response.data?.success) {
        setBandwidthCount(response.data.bandwidthCount);
        setBandwidthExpiresAt(response.data.bandwidthExpiresAt);
        setBandwidthAdjustment('');

        toast.success('Bandwidth updated successfully.');
      } else {
        toast.error(response.data?.message || 'Failed to update bandwidth.');
      }
    } catch (error) {
      console.error('❌ BANDWIDTH UPDATE ERROR:', error);

      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          'Failed to update bandwidth.',
      );
    }
  };

  const paidSettingSave = async () => {
    try {
      // const res = await axios.put(
      //   `${API}/carousel/all-settings`,
      //   {
      //     userId: user._id,
      const cleanTargetUserName = targetUserName.trim();

      const res = await axios.put(
        `${API}/carousel/all-settings`,
        {
          ...(cleanTargetUserName && {
            targetUserName: cleanTargetUserName,
          }),
          isPaid: isPaid,
        },
        {
          withCredentials: true,
        },
      );

      if (res.data?.success) {
        setIsPaid(res.data.isPaid);

        toast.success('Paid status updated successfully');
      } else {
        toast.error(res.data?.message || 'Failed to update paid status');
        console.error('❌ PAID STATUS ERROR:', error);
      }
    } catch (error) {
      console.error('❌ PAID STATUS ERROR:', error);

      toast.error(
        error.response?.data?.error || 'Failed to update paid status',
      );
    }
  };

  return (
    <div className="container">
      <h1>Release The Brand Engine</h1>

      {/* showing this option if user is admin */}
      {userRole === 'admin' && (
        <>
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginBottom: '25px',
            }}
          >
            <div>
              <div
                style={{
                  color: '#777',
                  fontSize: '15px',
                  letterSpacing: '1px',
                }}
              >
                TOTAL USERS
              </div>

              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                }}
              >
                {totalUsers}
              </div>
            </div>

            <div>
              <div
                style={{
                  color: '#777',
                  fontSize: '15px',
                  letterSpacing: '1px',
                }}
              >
                PAID USERS
              </div>

              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                }}
              >
                {paidUsers}
              </div>
            </div>

            <div>
              <div
                style={{
                  color: '#777',
                  fontSize: '15px',
                  letterSpacing: '1px',
                }}
              >
                ADMIN USERS
              </div>

              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                }}
              >
                {adminUsers}
              </div>
            </div>
          </div>
          <div
            style={{
              marginBottom: '30px',
              padding: '20px',
              background: '#1d1d1d',
              border: '1px solid #007ef5',
              borderRadius: '16px',
              maxWidth: '500px',
            }}
            className="searchbar"
          >
            <label
              style={{
                display: 'block',
                marginBottom: '10px',
                color: '#aaa',
                fontSize: '12px',
                letterSpacing: '1px',
              }}
            >
              TARGET USER
            </label>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
              className="search-input-row"
            >
              <input
                type="text"
                value={targetUserName}
                onChange={(e) => setTargetUserName(e.target.value)}
                placeholder="Enter username..."
                className="inputbar"
                style={{
                  flex: 1,
                  height: '48px',
                  padding: '0 15px',
                  color: 'white',
                  background: '#202020',
                  border: '1px solid #00a2ff',
                  borderRadius: '10px',
                  outline: 'none',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />

              <div className="search-clear">
                <button
                  type="button"
                  onClick={() => {
                    setTargetUserName('');

                    fetchCarousel('');
                  }}
                  style={{
                    height: '48px',
                    padding: '0 15px',
                    color: '#aaa',
                    background: '#111118',
                    border: '1px solid #333340',
                    borderRadius: '10px',
                    cursor: 'pointer',
                  }}
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const username = targetUserName.trim();

                    if (!username) {
                      toast.error('Enter a username first');
                      return;
                    }

                    fetchCarousel(username);
                  }}
                  style={{
                    height: '45px',
                    padding: '0 18px',
                    color: 'white',
                    background: 'linear-gradient(135deg, #00aeff, #242424)',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                  }}
                >
                  Search User
                </button>
              </div>
            </div>

            <div
              style={{
                marginTop: '10px',
                fontSize: '12px',
                color: targetUserName ? '#c084fc' : '#666',
              }}
            >
              {targetUserName
                ? `Editing: @${targetUserName}`
                : 'No target selected — using your own account'}
            </div>
          </div>
          <h1>Bandwidth</h1>

          <label>Current Bandwidth</label>

          <div>{bandwidthCount.toLocaleString()} units</div>

          <label>Bandwidth Adjustment</label>

          <input
            type="number"
            value={bandwidthAdjustment}
            onChange={(e) => setBandwidthAdjustment(e.target.value)}
            placeholder="+500 or -300"
          />

          <button onClick={bandwidthSettingSave}>Save Bandwidth</button>

          <label>Bandwidth Expiry</label>

          <div>
            {bandwidthExpiresAt
              ? new Date(bandwidthExpiresAt).toLocaleString()
              : 'No expiry set'}
          </div>

          <h1>Paid</h1>

          <select
            value={String(isPaid)}
            onChange={(e) => setIsPaid(e.target.value === 'true')}
            style={{
              color: 'white',
              backgroundColor: '#242424',
              borderRadius: '10px',
              height: '50px',
            }}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>

          <button onClick={paidSettingSave}>Save Paid Status</button>

          <h1>App Type</h1>

          <select
            value={appType}
            onChange={(e) => setAppType(e.target.value)}
            style={{
              color: 'white',
              backgroundColor: '#242424',
              borderRadius: '10px',
              height: '50px',
            }}
          >
            <option value="">Select App Type</option>
            <option value="BrandEnginePicNoModel">BrandEnginePicNoModel</option>
            <option value="BrandEnginePicModel">BrandEnginePicModel</option>
            <option value="BrandEngineVideoNoModel">
              BrandEngineVideoNoModel
            </option>
            <option value="BrandEngineVideoModel">BrandEngineVideoModel</option>
          </select>
          <button onClick={appTypeSettingSave}>Save App Type</button>

          <h1>Platform Embed Type</h1>

          <select
            value={embedType}
            onChange={(e) => setEmbedType(e.target.value)}
            style={{
              color: 'white',
              backgroundColor: '#242424',
              borderRadius: '10px',
              height: '50px',
            }}
          >
            <option value="">Select Platform</option>

            <option value="website">Website</option>

            <option value="app">App</option>
          </select>

          <button onClick={embedTypeSettingSave}>Save Embed Type</button>
        </>
      )}

      {/* User Name */}
      <h1> User Name</h1>

      {savedUserName && (
        <p>
          Username: <strong>{savedUserName}</strong>
        </p>
      )}

      <input
        type="text"
        value={userNameInput}
        onChange={(e) => setUserNameInput(e.target.value)}
        placeholder="Enter unique username"
      />
      <button onClick={userNameSettingSave}>Save User Name</button>

      {isPaid && (
        <>
          {(appType === 'BrandEnginePicNoModel' ||
            appType === 'BrandEnginePicModel') && (
            <>
              <h1>Images</h1>
              {/* =========================
          DRAGGABLE CAROUSEL
      ========================= */}

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd('images')}
              >
                <SortableContext
                  items={images.map((_, i) => i.toString())}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="carousel-scroll">
                    {images.map((img, index) => (
                      <SortableItem key={index} id={index.toString()}>
                        <div className="carousel-item">
                          <img src={img} alt="" />

                          <button
                            className="delete-btn"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              deleteFile('images', img);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
              {/* pic upload settings */}
              <input
                type="file"
                multiple
                name="images"
                onChange={handleChange}
              />

              {/* =========================
          FILE INPUTS
      ========================= */}

              {/* uploading percent with axios */}
              {uploading && uploadingType === 'images' && (
                <div>
                  <p>Saving Images... {uploadProgress}%</p>

                  <progress
                    value={uploadProgress}
                    max="100"
                    style={{ width: '300px' }}
                  />
                </div>
              )}

              <div className="image-settings-buttons">
                <button
                  onClick={() => {
                    setUploadingType('images');
                    handleUpload();
                  }}
                >
                  Save Settings
                </button>

                {/* <button onClick={deleteImageSettings}>Delete Settings</button> */}
              </div>
              {/* pic radius settings */}

              <div className="image-settings">
                <label>Image Radius</label>
                <input
                  type="number"
                  value={imageRadius}
                  onChange={(e) => setImageRadius(e.target.value)}
                />
                <br />
                {/* pic glow colors  */}
                <label>Image Glow</label>

                <div className="color-row">
                  <input
                    type="color"
                    value={selectedImageGlow}
                    onChange={(e) => setSelectedImageGlow(e.target.value)}
                  />

                  <button
                    onClick={() =>
                      setImageGlow((prev) => [...prev, selectedImageGlow])
                    }
                  >
                    Add Color
                  </button>
                  {imageGlow.map((color, index) => (
                    <div key={index} className="color-row">
                      <input type="text" value={color} readOnly />

                      <div
                        className="color-preview"
                        style={{
                          background: color,
                        }}
                      />

                      <button onClick={() => removeGlowImage(index)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>

                {/*  pic size - small and big screen */}
                <label>Image Size (Small Screen)</label>
                <input
                  type="number"
                  value={imageSizeSmallScreen}
                  onChange={(e) => setImageSizeSmallScreen(e.target.value)}
                />
                <br />
                <label>Image Size (Big Screen)</label>
                <input
                  type="number"
                  value={imageSizeBigScreen}
                  onChange={(e) => setImageSizeBigScreen(e.target.value)}
                />
                <br />
                {/* on hover glow color */}
                <label>Image Hover Glow</label>

                <div className="color-row">
                  <input
                    type="color"
                    value={imageHoverGlow || '#fbadff'}
                    onChange={(e) => setImageHoverGlow(e.target.value)}
                  />
                  <input
                    type="text"
                    value={imageHoverGlow}
                    onChange={(e) => setImageHoverGlow(e.target.value)}
                    placeholder="#fbadff"
                  />
                  <div
                    className="color-preview"
                    style={{
                      background: imageHoverGlow || '#fbadff',
                    }}
                  />
                </div>

                <div className="image-settings-buttons">
                  <button
                    onClick={() => {
                      imageSettingSave();
                    }}
                  >
                    Save Settings
                  </button>

                  <button onClick={deleteImageSettings}>Delete Settings</button>
                </div>
              </div>
            </>
          )}

          {(appType === 'BrandEngineVideoNoModel' ||
            appType === 'BrandEngineVideoModel') && (
            <>
              <h1>Videos</h1>
              {/* video upload settings */}
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd('videos')}
              >
                <SortableContext
                  items={videos.map((_, i) => i.toString())}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="carousel-scroll">
                    {videos.map((vid, index) => (
                      <SortableItem key={index} id={index.toString()}>
                        <div className="carousel-item">
                          <video src={vid} controls width="150" />

                          <button
                            className="delete-btn"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              deleteFile('videos', vid);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <input
                type="file"
                multiple
                name="videos"
                onChange={handleChange}
              />

              {/* video loading */}
              {uploading && uploadingType === 'videos' && (
                <div>
                  <p>Saving Videos... {uploadProgress}%</p>

                  <progress
                    value={uploadProgress}
                    max="100"
                    style={{ width: '300px' }}
                  />
                </div>
              )}

              <div className="video-settings-buttons">
                <button
                  onClick={() => {
                    setUploadingType('videos');
                    handleUpload();
                  }}
                >
                  Save Settings
                </button>

                {/* <button onClick={deleteVideoSettings}>Delete Settings</button> */}
              </div>

              {/* video radius settings */}
              <div className="video-settings">
                <label>Video Radius</label>
                <input
                  type="number"
                  value={videoRadius}
                  onChange={(e) => setVideoRadius(e.target.value)}
                />
                <br />
                {/* video glow colors  */}
                <label>Video Glow</label>

                <div className="color-row">
                  <input
                    type="color"
                    value={selectedVideoGlow}
                    onChange={(e) => setSelectedVideoGlow(e.target.value)}
                  />

                  <button
                    onClick={() =>
                      setVideoGlow((prev) => [...prev, selectedVideoGlow])
                    }
                  >
                    Add Color
                  </button>

                  {videoGlow.map((color, index) => (
                    <div key={index} className="color-row">
                      <input type="text" value={color} readOnly />

                      <div
                        className="color-preview"
                        style={{
                          background: color,
                        }}
                      />

                      <button onClick={() => removeGlowVideo(index)}>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>

                {/*  video size  - small and big screen */}
                <label>Video Size (Small Screen)</label>
                <input
                  type="number"
                  value={videoSizeSmallScreen}
                  onChange={(e) => setVideoSizeSmallScreen(e.target.value)}
                />
                <br />
                <label>Video Size (Big Screen)</label>
                <input
                  type="number"
                  value={videoSizeBigScreen}
                  onChange={(e) => setVideoSizeBigScreen(e.target.value)}
                />
                <br />
                {/* on hover glow color */}
                <label>Video Hover Glow</label>

                <div className="color-row">
                  <input
                    type="color"
                    value={hoverGlow || '#fbadff'}
                    onChange={(e) => setHoverGlow(e.target.value)}
                  />

                  <input
                    type="text"
                    value={hoverGlow}
                    onChange={(e) => setHoverGlow(e.target.value)}
                    placeholder="#fbadff"
                  />

                  <div
                    className="color-preview"
                    style={{
                      background: hoverGlow || '#fbadff',
                    }}
                  />
                </div>

                <br />
                <label>Auto Play Video OffSet </label>
                <input
                  type="number"
                  value={autoVideoPlay}
                  onChange={(e) => setAutoVideoPlay(e.target.value)}
                />

                <div className="video-settings-buttons">
                  <button
                    onClick={() => {
                      videoSettingSave();
                    }}
                  >
                    Save Settings
                  </button>

                  <button onClick={deleteVideoSettings}>Delete Settings</button>
                </div>
              </div>
            </>
          )}

          {(appType === 'BrandEngineVideoNoModel' ||
            appType === 'BrandEngineVideoModel') && (
            <>
              <h1>Poster Images</h1>
              {/* poster pic upload setting */}

              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd('posterImages')}
              >
                <SortableContext
                  items={posterImages.map((_, i) => i.toString())}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="carousel-scroll">
                    {posterImages.map((img, index) => (
                      <SortableItem key={index} id={index.toString()}>
                        <div className="carousel-item">
                          <img src={img} alt="" />

                          <button
                            className="delete-btn"
                            onPointerDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              deleteFile('posterImages', img);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </SortableItem>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>

              <input
                type="file"
                multiple
                name="posterImages"
                onChange={handleChange}
              />
              {/* video loading */}
              {uploading && uploadingType === 'posterImages' && (
                <div>
                  <p>Saving Poster ... {uploadProgress}%</p>

                  <progress
                    value={uploadProgress}
                    max="100"
                    style={{ width: '300px' }}
                  />
                </div>
              )}

              <div className="poster-image-button">
                <button
                  onClick={() => {
                    setUploadingType('posterImages');
                    handleUpload();
                  }}
                >
                  Save Settings
                </button>
              </div>
            </>
          )}

          <h1>Call To Action Button</h1>

          <label>Call to action text</label>

          <input
            type="text"
            value={buyNowButtonText}
            onChange={(e) => setBuyNowButtonText(e.target.value)}
          />

          <label>Button Link</label>
          {buyNowButtonlink.map((link, index) => (
            <div key={index}>
              <input
                type="text"
                value={link}
                onChange={(e) => {
                  const updatedLinks = [...buyNowButtonlink];
                  updatedLinks[index] = e.target.value;
                  setBuyNowButtonlink(updatedLinks);
                }}
                placeholder={`https://example.com — Button ${index + 1}`}
              />

              {buyNowButtonlink.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    setBuyNowButtonlink(
                      buyNowButtonlink.filter((_, i) => i !== index),
                    );
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          {buyNowButtonlink.length < 8 && (
            <button
              type="button"
              onClick={() => setBuyNowButtonlink([...buyNowButtonlink, ''])}
            >
              Add Button Link
            </button>
          )}

          <label> Call to action Font Family</label>
          {buyNowButtonFontFamily && (
            <p>
              Font uploaded:
              <br />
              {buyNowButtonFontFamily.split('-').pop()}
            </p>
          )}

          <input
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            disabled={fontUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                uploadFont(file, 'buyNowButtonFontFamily');
              }

              e.target.value = '';
            }}
          />
          <label>Button Font Size</label>
          <input
            type="number"
            min="0.1"
            max="100"
            step="0.1"
            value={buyNowButtonFontSize}
            onChange={(e) => setBuyNowButtonFontSize(Number(e.target.value))}
          />

          <label>Button Background Color</label>

          <div className="color-row">
            <input
              type="color"
              value={buyNowButtonBackgroundColor}
              onChange={(e) => setBuyNowButtonBackgroundColor(e.target.value)}
            />

            <input
              type="text"
              value={buyNowButtonBackgroundColor}
              onChange={(e) => setBuyNowButtonBackgroundColor(e.target.value)}
            />

            <div
              className="color-preview"
              style={{
                background: buyNowButtonBackgroundColor,
              }}
            />
          </div>

          <label> Button Text Color</label>

          <div className="color-row">
            <input
              type="color"
              value={buyNowButtonTextColor}
              onChange={(e) => setBuyNowButtonTextColor(e.target.value)}
            />

            <input
              type="text"
              value={buyNowButtonTextColor}
              onChange={(e) => setBuyNowButtonTextColor(e.target.value)}
            />

            <div
              className="color-preview"
              style={{
                background: buyNowButtonTextColor,
              }}
            />
          </div>

          <label> Button Radius</label>
          <input
            type="number"
            value={buyNowButtonRadius}
            onChange={(e) => {
              const value = e.target.value;
              setBuyNowButtonRadius(value === '' ? '' : Number(value));
            }}
            placeholder="10"
          />

          <label>Hover Background Color</label>

          <div className="color-row">
            <input
              type="color"
              value={buyNowButtonHoverBGColor}
              onChange={(e) => setBuyNowButtonHoverBGColor(e.target.value)}
            />

            <input
              type="text"
              value={buyNowButtonHoverBGColor}
              onChange={(e) => setBuyNowButtonHoverBGColor(e.target.value)}
            />

            <div
              className="color-preview"
              style={{
                background: buyNowButtonHoverBGColor,
              }}
            />
          </div>

          <label>Hover Text Color</label>

          <div className="color-row">
            <input
              type="color"
              value={buyNowButtonHoverTextColor}
              onChange={(e) => setBuyNowButtonHoverTextColor(e.target.value)}
            />

            <input
              type="text"
              value={buyNowButtonHoverTextColor}
              onChange={(e) => setBuyNowButtonHoverTextColor(e.target.value)}
            />

            <div
              className="color-preview"
              style={{
                background: buyNowButtonHoverTextColor,
              }}
            />
          </div>

          <div>
            <label>Buy Now Button Height — Small Screen</label>

            <input
              type="number"
              value={buyNowButtonHeightSmallScreen}
              onChange={(e) => setBuyNowButtonHeightSmallScreen(e.target.value)}
            />
          </div>

          <div>
            <label>Buy Now Button Height — Medium Screen</label>

            <input
              type="number"
              value={buyNowButtonHeightMediumScreen}
              onChange={(e) =>
                setBuyNowButtonHeightMediumScreen(e.target.value)
              }
            />
          </div>

          <div>
            <label>Buy Now Button Height — Big Screen</label>

            <input
              type="number"
              value={buyNowButtonHeightBigScreen}
              onChange={(e) => setBuyNowButtonHeightBigScreen(e.target.value)}
            />
          </div>

          <button onClick={buyNowButtonSettingSave}>
            Save Call to action Settings
          </button>

          <h1>Glow Logo</h1>

          <label>Logo Font Family</label>
          {logoFontFamily && (
            <p>
              Font uploaded:
              <br />
              {logoFontFamily.split('-').pop()}
            </p>
          )}

          <input
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            disabled={fontUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                uploadFont(file, 'logoFontFamily');
              }

              e.target.value = '';
            }}
          />

          <label>Logo Font Size Small Screen</label>

          <input
            type="number"
            value={logoFontSizeSmallScreen}
            onChange={(e) => setLogoFontSizeSmallScreen(e.target.value)}
          />

          <label>Logo Font Size Medium Screen</label>

          <input
            type="number"
            value={logoFontSizeMediumScreen}
            onChange={(e) => setLogoFontSizeMediumScreen(e.target.value)}
          />

          <label>Logo Font Size Big Screen</label>

          <input
            type="number"
            value={logoFontSizeBigScreen}
            onChange={(e) => setLogoFontSizeBigScreen(e.target.value)}
          />

          <label>Logo Glow Colors</label>

          <div className="color-row">
            <input
              type="color"
              value={selectedLogoGlow}
              onChange={(e) => setSelectedLogoGlow(e.target.value)}
            />

            <button onClick={addLogoGlowColor}>Add Color</button>
          </div>

          {logoGlowColors.map((color, index) => (
            <div key={index} className="color-row">
              <input type="text" value={color} readOnly />

              <div
                className="color-preview"
                style={{
                  background: color,
                }}
              />

              <button onClick={() => removeLogoGlow(index)}>Delete</button>
            </div>
          ))}

          <label>Logo Text</label>

          <input
            type="text"
            value={logoText}
            onChange={(e) => setLogoText(e.target.value)}
          />

          <label>Logo Vertical Height</label>

          <input
            type="number"
            value={logoVerticalHeight}
            onChange={(e) => setLogoVerticalHeight(e.target.value)}
          />

          <button onClick={logoSettingSave}>Save Logo Settings</button>

          <h1>Music</h1>
          {/*  Music upload  */}
          {music && (
            <div className="carousel-scroll">
              <div className="carousel-item">
                <audio controls>
                  <source
                    src={
                      typeof music === 'string'
                        ? music
                        : URL.createObjectURL(music)
                    }
                  />
                </audio>

                <button
                  className="delete-btn"
                  onClick={() => deleteSingleFile('music')}
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          <input type="file" name="music" onChange={handleChange} />

          {/* uploading percent with axios */}
          {uploading && uploadingType === 'music' && (
            <div>
              <p>Saving music... {uploadProgress}%</p>

              <progress
                value={uploadProgress}
                max="100"
                style={{ width: '300px' }}
              />
            </div>
          )}

          <div className="image-settings-buttons">
            <button
              onClick={() => {
                setUploadingType('music');
                handleUpload();
              }}
            >
              Save Settings
            </button>
          </div>

          {/*  musicButtonGlowColor  */}
          <label>Music Button Glow Color</label>

          <div className="color-row">
            <input
              type="color"
              value={musicButtonGlowColor}
              onChange={(e) => setMusicButtonGlowColor(e.target.value)}
            />

            <input
              type="text"
              value={musicButtonGlowColor}
              onChange={(e) => setMusicButtonGlowColor(e.target.value)}
            />

            <div
              className="color-preview"
              style={{
                background: musicButtonGlowColor,
              }}
            />
          </div>

          <label>Music Button Background Color</label>

          <div className="color-row">
            <input
              type="color"
              value={musicButtonBackGroundColor}
              onChange={(e) => setMusicButtonBackGroundColor(e.target.value)}
            />

            <input
              type="text"
              value={musicButtonBackGroundColor}
              onChange={(e) => setMusicButtonBackGroundColor(e.target.value)}
            />

            <div
              className="color-preview"
              style={{
                background: musicButtonBackGroundColor,
              }}
            />
          </div>

          <button onClick={musicButtonSettingSave}>
            Save Music Button Settings
          </button>

          <h1>Freeze Button</h1>

          <label>Freeze Button Glow Color</label>

          <div className="color-row">
            <input
              type="color"
              value={freezeButtonGlowColor}
              onChange={(e) => setFreezeButtonGlowColor(e.target.value)}
            />

            <input
              type="text"
              value={freezeButtonGlowColor}
              onChange={(e) => setFreezeButtonGlowColor(e.target.value)}
            />

            <div
              className="color-preview"
              style={{
                background: freezeButtonGlowColor,
              }}
            />
          </div>

          <label>Freeze Button Background Color</label>

          <div className="color-row">
            <input
              type="color"
              value={freezeButtonBackgroundColor}
              onChange={(e) => setFreezeButtonBackgroundColor(e.target.value)}
            />

            <input
              type="text"
              value={freezeButtonBackgroundColor}
              onChange={(e) => setFreezeButtonBackgroundColor(e.target.value)}
            />

            <div
              className="color-preview"
              style={{
                background: freezeButtonBackgroundColor,
              }}
            />
          </div>

          <button onClick={freezeButtonSettingSave}>
            Save Freeze Button Settings
          </button>

          <h1>Creator Attribution</h1>

          <label>Attribution Text</label>

          <input
            type="text"
            value={atributionText}
            onChange={(e) => setAtributionText(e.target.value)}
          />

          <label>Attribution Link</label>

          <input
            type="text"
            value={atributionLink}
            onChange={(e) => setAtributionLink(e.target.value)}
            placeholder="https://example.com"
          />

          <label>Attribution Bulb Glow Color</label>

          <div className="color-row">
            <input
              type="color"
              value={atributionBulbGlowColor}
              onChange={(e) => setAtributionBulbGlowColor(e.target.value)}
            />

            <input
              type="text"
              value={atributionBulbGlowColor}
              onChange={(e) => setAtributionBulbGlowColor(e.target.value)}
            />

            <div
              className="color-preview"
              style={{
                background: atributionBulbGlowColor,
              }}
            />
          </div>

          <label>Attribution Background Color</label>

          <div className="color-row">
            <input
              type="color"
              value={atributionBackgroundColor}
              onChange={(e) => setAtributionBackgroundColor(e.target.value)}
            />

            <input
              type="text"
              value={atributionBackgroundColor}
              onChange={(e) => setAtributionBackgroundColor(e.target.value)}
            />

            <div
              className="color-preview"
              style={{
                background: atributionBackgroundColor,
              }}
            />
          </div>

          <button onClick={atributionSettingSave}>
            Save Attribution Settings
          </button>

          {(appType === 'BrandEngineVideoModel' ||
            appType === 'BrandEnginePicModel') && (
            <>
              <h1>3d Model</h1>

              {model3D && (
                <div className="carousel-scroll">
                  <div className="carousel-item">
                    <p>
                      {typeof model3D === 'string'
                        ? model3D.split('-').pop()
                        : model3D.name}
                    </p>

                    <button
                      className="delete-btn"
                      onClick={() => deleteSingleFile('model3D')}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}

              <input type="file" name="model3D" onChange={handleChange} />

              {/* uploading percent with axios */}
              {uploading && uploadingType === 'model3D' && (
                <div>
                  <p>Saving 3d model... {uploadProgress}%</p>

                  <progress
                    value={uploadProgress}
                    max="100"
                    style={{ width: '300px' }}
                  />
                </div>
              )}

              <div className="image-settings-buttons">
                <button
                  onClick={() => {
                    setUploadingType('model3D');
                    handleUpload();
                  }}
                >
                  Save Settings
                </button>
              </div>

              {/* ========================= */}

              <h3>Model Settings</h3>

              <label>Model Size Tiny Screen</label>
              <input
                type="number"
                step="any"
                value={modelSizeTinyScreen}
                onChange={(e) => setModelSizeTinyScreen(e.target.value)}
                placeholder="0.1 or 1 etc"
              />

              <label>Model Size Small Screen</label>
              <input
                type="number"
                step="any"
                value={modelSizeSmallScreen}
                onChange={(e) => setModelSizeSmallScreen(e.target.value)}
                placeholder="0.1 or 1 etc"
              />

              <label>Model Size Medium Screen</label>
              <input
                type="number"
                step="any"
                value={modelSizeMediumScreen}
                onChange={(e) => setModelSizeMediumScreen(e.target.value)}
                placeholder="0.1 or 1 etc"
              />

              <label>Model Size Big Screen</label>
              <input
                type="number"
                step="any"
                value={modelSizeBigScreen}
                onChange={(e) => setModelSizeBigScreen(e.target.value)}
                placeholder="0.1 or 1 etc"
              />

              <label>Model Position</label>

              <input
                type="text"
                value={modelPosition}
                onChange={(e) => setModelPosition(e.target.value)}
                placeholder="0, -0.7, -5"
              />

              <label>Model Position Medium</label>

              <input
                type="text"
                value={modelPositionMedium}
                onChange={(e) => setModelPositionMedium(e.target.value)}
                placeholder="0, -0.7, -5"
              />

              <label>Model Position Big</label>

              <input
                type="text"
                value={modelPositionBig}
                onChange={(e) => setModelPositionBig(e.target.value)}
                placeholder="0, -0.7, -5"
              />
              <label>Model Rotation Y</label>

              <input
                type="number"
                value={modelRotation}
                onChange={(e) => setModelRotation(e.target.value)}
                placeholder="90"
              />

              <label>Model Rotation X</label>

              <input
                type="number"
                value={modelRotationX}
                onChange={(e) => setModelRotationX(e.target.value)}
                placeholder="90"
              />
              <label>Model Rotation Z</label>

              <input
                type="number"
                value={modelRotationZ}
                onChange={(e) => setModelRotationZ(e.target.value)}
                placeholder="90"
              />
              <label>Model Roughness</label>
              <input
                type="number"
                step="any"
                value={modelRoughness}
                onChange={(e) => setModelRoughness(e.target.value)}
                placeholder="0.1 or 1 etc"
              />

              <label>Model Metalness</label>
              <input
                type="number"
                step="any"
                value={modelMetalness}
                onChange={(e) => setModelMetalness(e.target.value)}
                placeholder="0.1 or 1 etc"
              />

              <label>Model Environment Map Intensity</label>
              <input
                type="number"
                step="any"
                value={modelEnvMapIntensity}
                onChange={(e) => setModelEnvMapIntensity(e.target.value)}
                placeholder="0.1 or 1 etc"
              />

              <label>Model Animation Speed</label>
              <input
                type="number"
                step="any"
                value={modelAnimationSpeed}
                onChange={(e) => setModelAnimationSpeed(e.target.value)}
                placeholder="0.1 or 1 etc"
              />

              <label>Model Repaint</label>
              <div className="color-row">
                <input
                  type="color"
                  value={modelRepaintColor || '#ffffff'}
                  onChange={(e) => setModelRepaintColor(e.target.value)}
                />

                <input
                  type="text"
                  value={modelRepaintColor}
                  onChange={(e) => setModelRepaintColor(e.target.value)}
                  placeholder="Optional"
                />

                <div
                  className="color-preview"
                  style={{
                    background: modelRepaintColor || 'transparent',
                  }}
                />
              </div>

              <button onClick={glbSettingSave}>Save Model Settings</button>
            </>
          )}

          <h1> Control</h1>

          <label> Rotation Speed And Direction + or -</label>
          <input
            type="text"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(e.target.value)}
            placeholder="25 or -25"
          />

          <label>Rotation Radius</label>

          <input
            type="number"
            step="any"
            value={carouselRadius}
            onChange={(e) => setCarouselRadius(e.target.value)}
            placeholder="0.5 or 1"
          />

          <button onClick={carouselControlSettingSave}>
            Save Control Settings
          </button>

          <h1>Hdri </h1>

          {hdri && (
            <div className="carousel-scroll">
              <div className="carousel-item">
                <p>
                  {typeof hdri === 'string' ? hdri.split('-').pop() : hdri.name}
                </p>
                <button
                  className="delete-btn"
                  onClick={() => deleteSingleFile('hdri')}
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          <input type="file" name="hdri" onChange={handleChange} />

          {/* uploading percent with axios */}
          {uploading && uploadingType === 'hdri' && (
            <div>
              <p>Saving hdri... {uploadProgress}%</p>

              <progress
                value={uploadProgress}
                max="100"
                style={{ width: '300px' }}
              />
            </div>
          )}

          <div className="image-settings-buttons">
            <button
              onClick={() => {
                setUploadingType('hdri');
                handleUpload();
              }}
            >
              Save Settings
            </button>
          </div>

          <label>HDRI Brightness</label>

          <input
            type="number"
            step="any"
            value={hdriBrigthness}
            onChange={(e) => setHdriBrigthness(e.target.value)}
            placeholder="0.5 or 1"
          />

          <button onClick={hdriSettingSave}>Save HDRI Settings</button>

          <h1>360 Image</h1>
          <h5>360 Panorama 6k Image</h5>
          {image360 && (
            <div className="carousel-scroll">
              <div className="carousel-item">
                <img
                  src={
                    typeof image360 === 'string'
                      ? image360
                      : URL.createObjectURL(image360)
                  }
                  alt="360"
                  width="200"
                />

                <button
                  className="delete-btn"
                  onClick={() => deleteSingleFile('image360')}
                >
                  Delete
                </button>
              </div>
              <p>
                Name:
                <br />
                {typeof image360 === 'string'
                  ? image360.split('-').pop()
                  : image360.name}
              </p>
            </div>
          )}

          <input type="file" name="image360" onChange={handleChange} />

          {/* uploading percent with axios */}
          {uploading && uploadingType === 'image360' && (
            <div>
              <p>Saving Image... {uploadProgress}%</p>

              <progress
                value={uploadProgress}
                max="100"
                style={{ width: '300px' }}
              />
            </div>
          )}

          <div className="image-settings-buttons">
            <button
              onClick={() => {
                setUploadingType('image360');
                handleUpload();
              }}
            >
              Save Settings
            </button>
          </div>

          <h5>360 Panorama 8k Image</h5>
          {image3608k && (
            <div className="carousel-scroll">
              <div className="carousel-item">
                <img
                  src={
                    typeof image3608k === 'string'
                      ? image3608k
                      : URL.createObjectURL(image3608k)
                  }
                  alt="360"
                  width="200"
                />

                <button
                  className="delete-btn"
                  onClick={() => deleteSingleFile('image3608k')}
                >
                  Delete
                </button>
              </div>
              <p>
                Name:
                <br />
                {typeof image3608k === 'string'
                  ? image3608k.split('-').pop()
                  : image3608k.name}
              </p>
            </div>
          )}

          <input type="file" name="image3608k" onChange={handleChange} />

          {/* uploading percent with axios */}
          {uploading && uploadingType === 'image3608k' && (
            <div>
              <p>Saving Image... {uploadProgress}%</p>

              <progress
                value={uploadProgress}
                max="100"
                style={{ width: '300px' }}
              />
            </div>
          )}

          <div className="image-settings-buttons">
            <button
              onClick={() => {
                setUploadingType('image3608k');
                handleUpload();
              }}
            >
              Save Settings
            </button>
          </div>

          <label>360 Panorama Initial Rotation</label>
          <input
            type="number"
            value={initial360RotationY}
            onChange={(e) => setInitial360RotationY(e.target.value)}
            placeholder="360 initial rotation"
          />
          <button onClick={initial360RotationSave}>
            Save 360 Panorama Rotation Settings
          </button>
          {/* ========================= */}

          <h1>Loading Video</h1>

          {loadingVideo && (
            <div className="carousel-scroll">
              <div className="carousel-item">
                <video
                  src={
                    typeof loadingVideo === 'string'
                      ? loadingVideo
                      : URL.createObjectURL(loadingVideo)
                  }
                  controls
                  width="250"
                />

                <button
                  className="delete-btn"
                  onClick={() => deleteSingleFile('loadingVideo')}
                >
                  Delete
                </button>
              </div>
              <p>
                Name: <br />
                {typeof loadingVideo === 'string'
                  ? loadingVideo.split('-').pop()
                  : loadingVideo.name}
              </p>
            </div>
          )}

          <input type="file" name="loadingVideo" onChange={handleChange} />

          {/* uploading percent with axios */}
          {uploading && uploadingType === 'loadingVideo' && (
            <div>
              <p>Saving loading video... {uploadProgress}%</p>

              <progress
                value={uploadProgress}
                max="100"
                style={{ width: '300px' }}
              />
            </div>
          )}

          <div className="image-settings-buttons">
            <button
              onClick={() => {
                setUploadingType('loadingVideo');
                handleUpload();
              }}
            >
              Save Settings
            </button>
          </div>

          {/* ========================= */}

          <h1>Popup Help Text</h1>

          <label>Popup Text Font Family</label>

          {popupTextFontFamily && (
            <p>
              Font uploaded:
              <br />
              {popupTextFontFamily.split('-').pop()}
            </p>
          )}
          <input
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            disabled={fontUploading}
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                uploadFont(file, 'popupTextFontFamily');
              }

              e.target.value = '';
            }}
          />
          {/* uploading percent with axios */}
          {uploading && uploadingType === 'popupTextFontFamily' && (
            <div>
              <p>Saving font... {uploadProgress}%</p>

              <progress
                value={uploadProgress}
                max="100"
                style={{ width: '300px' }}
              />
            </div>
          )}

          <label>Popup Text</label>

          <input
            type="text"
            value={popupText}
            onChange={(e) => setPopupText(e.target.value)}
          />

          <label>Popup Text Size</label>

          <input
            type="number"
            value={popupTextSize}
            onChange={(e) => setPopupTextSize(Number(e.target.value))}
          />

          <label>Popup Text Color</label>

          <div className="color-row">
            <input
              type="color"
              value={popupTextColor}
              onChange={(e) => setPopupTextColor(e.target.value)}
            />

            <input
              type="text"
              value={popupTextColor}
              onChange={(e) => setPopupTextColor(e.target.value)}
            />

            <div
              className="color-preview"
              style={{
                background: popupTextColor,
              }}
            />
          </div>

          <label>Popup Background Color</label>

          <div className="color-row">
            <input
              type="color"
              value={popupTextBackgroundColor}
              onChange={(e) => setPopupTextBackgroundColor(e.target.value)}
            />

            <input
              type="text"
              value={popupTextBackgroundColor}
              onChange={(e) => setPopupTextBackgroundColor(e.target.value)}
            />

            <div
              className="color-preview"
              style={{
                background: popupTextBackgroundColor,
              }}
            />
          </div>

          <button onClick={popupSettingSave}>Save Popup Settings</button>

          <h1>Glow Border</h1>

          <label>Glow Border Rotation Speed</label>

          <input
            type="number"
            step="1"
            value={glowBorderRotationSpeed}
            onChange={(e) => setGlowBorderRotationSpeed(e.target.value)}
            placeholder="1, 20, 400"
          />

          <button onClick={glowBorderSettingSave}>
            Save Glow Border Settings
          </button>

          <h1>Allowed Domain</h1>

          <label> Domain</label>

          <input
            type="text"
            value={allowedDomain}
            onChange={(e) => setAllowedDomain(e.target.value)}
            placeholder="example.com"
          />

          <button onClick={allowedDomainSettingSave}>Save Domain</button>

          <h1> Camera </h1>
          <label>Camera Position</label>

          <input
            type="text"
            value={cameraPosition}
            onChange={(e) => setCameraPosition(e.target.value)}
            placeholder="0, 0, 0"
          />

          <h3>Camera FOV</h3>

          <label>Small Screen</label>

          <input
            type="number"
            step="1"
            value={smallScreen}
            onChange={(e) => setSmallScreen(e.target.value)}
          />

          <label>Big Screen</label>

          <input
            type="number"
            step="1"
            value={bigScreen}
            onChange={(e) => setBigScreen(e.target.value)}
          />

          <button onClick={cameraSettingSave}>Save Camera FOV</button>

          <h1>Tilt Position On Load</h1>

          <label>Small Screen</label>

          <input
            type="text"
            value={brandEngineTiltSmallScreen}
            onChange={(e) => setBrandEngineTiltSmallScreen(e.target.value)}
            placeholder="-15 or 15 number "
          />

          <label>Medium Screen</label>

          <input
            type="text"
            value={brandEngineTiltMediumScreen}
            onChange={(e) => setBrandEngineTiltMediumScreen(e.target.value)}
            placeholder="-15 or 15 number "
          />

          <label>Big Screen</label>

          <input
            type="text"
            value={brandEngineTiltBigScreen}
            onChange={(e) => setBrandEngineTiltBigScreen(e.target.value)}
            placeholder="-15 or 15 number "
          />

          <button onClick={tiltSettingSave}>Save Tilt Settings</button>

          <label>Contact Info</label>

          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="Email, phone number, WhatsApp, etc."
          />
          <button onClick={contactInfoSettingSave}>Save Contact</button>

          <h1>View Display Height</h1>

          <label>Small Screen</label>

          <input
            type="number"
            step="1"
            value={viewDisplayHeightSmallScreen}
            onChange={(e) => setViewDisplayHeightSmallScreen(e.target.value)}
          />

          <label>Medium Screen</label>

          <input
            type="number"
            step="1"
            value={viewDisplayHeightMediumScreen}
            onChange={(e) => setViewDisplayHeightMediumScreen(e.target.value)}
          />

          <label>Big Screen</label>

          <input
            type="number"
            step="1"
            value={viewDisplayHeightBigScreen}
            onChange={(e) => setViewDisplayHeightBigScreen(e.target.value)}
          />

          <button onClick={viewDisplayHeightSettingSave}>
            Save View Display
          </button>

          <h1>Spin Container Height</h1>

          <label>Small Screen</label>

          <input
            type="number"
            step="1"
            value={spinConHeightSmallScreen}
            onChange={(e) => setSpinConHeightSmallScreen(e.target.value)}
          />

          <label>Medium Screen</label>

          <input
            type="number"
            step="1"
            value={spinConHeightMediumScreen}
            onChange={(e) => setSpinConHeightMediumScreen(e.target.value)}
          />

          <label>Big Screen</label>

          <input
            type="number"
            step="1"
            value={spinConHeightBigScreen}
            onChange={(e) => setSpinConHeightBigScreen(e.target.value)}
          />

          <button onClick={spinContainerHeightSettingSave}>
            Save Spin Container Height
          </button>

          <h1>Flying Assets</h1>
          <label>Visible Angle Greater</label>

          <input
            type="number"
            value={visibleAngleGreater}
            onChange={(e) => setVisibleAngleGreater(e.target.value)}
            placeholder="110"
          />

          <label>Visible Angle Less</label>

          <input
            type="number"
            value={visibleAngleLess}
            onChange={(e) => setVisibleAngleLess(e.target.value)}
            placeholder="250"
          />

          <label>Flying Asset Tilt X</label>

          <input
            type="number"
            value={flyingAssetTiltX}
            onChange={(e) => setFlyingAssetTiltX(e.target.value)}
            placeholder="0"
          />

          <label>Flying Asset Tilt Y</label>

          <input
            type="number"
            value={flyingAssetTiltY}
            onChange={(e) => setFlyingAssetTiltY(e.target.value)}
            placeholder="0"
          />

          <label>Flying Asset Tilt Z</label>

          <input
            type="number"
            value={flyingAssetTiltZ}
            onChange={(e) => setFlyingAssetTiltZ(e.target.value)}
            placeholder="0"
          />

          <label>Flying Asset Hover Speed</label>

          <input
            type="number"
            value={flyingAssetHoverSpeed}
            onChange={(e) => setFlyingAssetHoverSpeed(e.target.value)}
            placeholder="2000"
          />

          <label>Flying Asset Hover Height Minimum</label>

          <input
            type="number"
            value={flyingAssetHoverHeightMin}
            onChange={(e) => setFlyingAssetHoverHeightMin(e.target.value)}
            placeholder="10"
          />

          <label>Flying Asset Hover Height Maximum</label>

          <input
            type="number"
            value={flyingAssetHoverHeightMax}
            onChange={(e) => setFlyingAssetHoverHeightMax(e.target.value)}
            placeholder="10"
          />
          <button onClick={flyingAssetSave}>Save Flying Assets</button>
        </>
      )}
    </div>
  );
}
