/* ========================================================
   Aman Go - School Bus Transportation System
   Interactive Database Schema & ERD Logic
   ======================================================== */

const schemaData = [
  // --- MODULE 1: USERS & AUTHENTICATION ---
  {
    name: "users",
    arabicName: "المستخدمين",
    category: "users",
    categoryLabel: "الحسابات والمصادقة",
    description: "جدول الحسابات الرئيسي لكافة المستخدمين (أولياء الأمور، السائقين، المشرفات).",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "المعرف الفريد للمستخدم" },
      { name: "name", type: "varchar(255)", key: "", desc: "الاسم الكامل للمستخدم" },
      { name: "phone", type: "varchar(20)", key: "UK", desc: "رقم الهاتف للدخول واستلام الـ OTP" },
      { name: "email", type: "varchar(255)", key: "UK", desc: "البريد الإلكتروني" },
      { name: "password", type: "varchar(255)", key: "", desc: "كلمة المرور المشفرة (Hash)" },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة الحساب (active, suspended, pending)" }
    ]
  },
  {
    name: "parent_profiles",
    arabicName: "ملفات أولياء الأمور",
    category: "users",
    categoryLabel: "الحسابات والمصادقة",
    description: "بيانات إضافية خاصة بولي أمر الطالب.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "المعرف الأساسي للملف" },
      { name: "user_id", type: "bigint", key: "FK", desc: "مرجع المستخدم في جدول users", ref: "users.id" },
      { name: "address", type: "varchar(255)", key: "", desc: "العنوان السكني الرئيسي" }
    ]
  },
  {
    name: "driver_profiles",
    arabicName: "ملفات السائقين",
    category: "fleet",
    categoryLabel: "الأسطول والسائقين",
    description: "بيانات السائق المهنية ورقم الرخصة والتقييم الإجمالي.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف السائق" },
      { name: "user_id", type: "bigint", key: "FK", desc: "مرجع المستخدم في users", ref: "users.id" },
      { name: "license_number", type: "varchar(50)", key: "", desc: "رقم رخصة القيادة المهنية" },
      { name: "approval_status", type: "varchar(20)", key: "", desc: "حالة الاعتماد (pending, approved, rejected)" },
      { name: "rating", type: "decimal(3,2)", key: "", desc: "متوسط التقييم العام المحسوب من تقييمات الرحلات" }
    ]
  },
  {
    name: "supervisor_profiles",
    arabicName: "ملفات مشرفات الحافلات",
    category: "users",
    categoryLabel: "الحسابات والمصادقة",
    description: "بيانات المشرفة / المرافقة المسؤولة عن تحضير وأمان الطلاب داخل الحافلة.",
    status: "new",
    badgeText: "جديد",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "المعرف الأساسي للمشرفة", isNew: true },
      { name: "user_id", type: "bigint", key: "FK", desc: "مرجع المستخدم في users", ref: "users.id", isNew: true },
      { name: "national_id", type: "varchar(30)", key: "", desc: "رقم الهوية الوطنية للمشرفة", isNew: true },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة العمل (active, on_leave, inactive)", isNew: true }
    ]
  },
  {
    name: "admins",
    arabicName: "مدراء النظام",
    category: "users",
    categoryLabel: "الحسابات والمصادقة",
    description: "حسابات موظفي الإدارة وغرفة العمليات في الشركة أو المدرسة.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف المدير" },
      { name: "name", type: "varchar(255)", key: "", desc: "اسم المدير" },
      { name: "email", type: "varchar(255)", key: "UK", desc: "البريد الإلكتروني الإداري" },
      { name: "password", type: "varchar(255)", key: "", desc: "كلمة المرور المشفرة" },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة الحساب الإداري" }
    ]
  },
  {
    name: "roles",
    arabicName: "الأدوار الإدارية",
    category: "users",
    categoryLabel: "الحسابات والمصادقة",
    description: "الأدوار الوظيفية للإداريين (Super Admin, Dispatcher, Support).",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف الدور" },
      { name: "name", type: "varchar(100)", key: "", desc: "اسم الدور" },
      { name: "slug", type: "varchar(50)", key: "UK", desc: "الاسم البرمجي الفريد (e.g. ops_manager)" }
    ]
  },
  {
    name: "permissions",
    arabicName: "الصلاحيات",
    category: "users",
    categoryLabel: "الحسابات والمصادقة",
    description: "قائمة الصلاحيات الدقيقة في لوحة التحكم.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف الصلاحية" },
      { name: "name", type: "varchar(100)", key: "", desc: "اسم الصلاحية" },
      { name: "slug", type: "varchar(100)", key: "UK", desc: "المعرف البرمجي للصلاحية (e.g. trips.create)" }
    ]
  },
  {
    name: "admin_roles",
    arabicName: "أدوار المدراء",
    category: "users",
    categoryLabel: "الحسابات والمصادقة",
    description: "جدول وسيط لربط المدراء بأدوارهم.",
    status: "core",
    fields: [
      { name: "admin_id", type: "bigint", key: "PK,FK", desc: "مرجع المدير في admins", ref: "admins.id" },
      { name: "role_id", type: "bigint", key: "PK,FK", desc: "مرجع الدور في roles", ref: "roles.id" }
    ]
  },
  {
    name: "role_permissions",
    arabicName: "صلاحيات الأدوار",
    category: "users",
    categoryLabel: "الحسابات والمصادقة",
    description: "جدول وسيط لربط الأدوار بالصلاحيات الممنوحة لها.",
    status: "core",
    fields: [
      { name: "role_id", type: "bigint", key: "PK,FK", desc: "مرجع الدور في roles", ref: "roles.id" },
      { name: "permission_id", type: "bigint", key: "PK,FK", desc: "مرجع الصلاحية في permissions", ref: "permissions.id" }
    ]
  },
  {
    name: "notifications",
    arabicName: "الإشعارات",
    category: "users",
    categoryLabel: "الحسابات والمصادقة",
    description: "سجل الإشعارات المرسلة للمستخدمين (وصول الباص، سداد، تنبيه غياب).",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف الإشعار" },
      { name: "user_id", type: "bigint", key: "FK", desc: "المستخدم المستلم للإشعار", ref: "users.id" },
      { name: "title", type: "varchar(255)", key: "", desc: "عنوان الإشعار" },
      { name: "body", type: "text", key: "", desc: "نص الإشعار" },
      { name: "read_at", type: "datetime", key: "", desc: "توقيت قراءة الإشعار" }
    ]
  },

  // --- MODULE 2: FLEET & DRIVERS ---
  {
    name: "vehicles",
    arabicName: "المركبات والحافلات",
    category: "fleet",
    categoryLabel: "الأسطول والسائقين",
    description: "بيانات الحافلات والسيارات وسعتها الاستيعابية للطلاب.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف الحافلة" },
      { name: "plate_number", type: "varchar(20)", key: "UK", desc: "رقم اللوحة المميز" },
      { name: "vehicle_type", type: "varchar(50)", key: "", desc: "نوع المركبة (Bus 30-seats, Van 14-seats)" },
      { name: "capacity", type: "int", key: "", desc: "السعة القصوى لعدد الطلاب" },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة المركبة (active, maintenance, inactive)" }
    ]
  },
  {
    name: "driver_vehicles",
    arabicName: "إسناد المركبات للسائقين",
    category: "fleet",
    categoryLabel: "الأسطول والسائقين",
    description: "سجل تخصيص كل حافلة لسائق محدد بفترة زمنية.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف التخصيص" },
      { name: "driver_id", type: "bigint", key: "FK", desc: "مرجع السائق", ref: "driver_profiles.id" },
      { name: "vehicle_id", type: "bigint", key: "FK", desc: "مرجع الحافلة", ref: "vehicles.id" },
      { name: "start_date", type: "date", key: "", desc: "تاريخ استلام الحافلة" },
      { name: "end_date", type: "date", key: "", desc: "تاريخ انتهاء الاستلام" },
      { name: "is_active", type: "boolean", key: "", desc: "هل هو السائق الفعلي الحالي للمركبة" },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة الإسناد" }
    ]
  },
  {
    name: "driver_documents",
    arabicName: "وثائق ورخص السائقين",
    category: "fleet",
    categoryLabel: "الأسطول والسائقين",
    description: "ملفات السائق ورخص القيادة وصحيفة الحالة الجنائية وتواريخ صلاحيتها.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف الوثيقة" },
      { name: "driver_id", type: "bigint", key: "FK", desc: "مرجع السائق", ref: "driver_profiles.id" },
      { name: "document_type", type: "varchar(50)", key: "", desc: "نوع الوثيقة (license, background_check)" },
      { name: "file_path", type: "varchar(255)", key: "", desc: "رابط ملف الوثيقة المرفوعة" },
      { name: "expiry_date", type: "date", key: "", desc: "تاريخ انتهاء صلاحية الوثيقة" },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة اعتماد الوثيقة (approved, expired)" }
    ]
  },
  {
    name: "vehicle_documents",
    arabicName: "وثائق وتراخيص الحافلات",
    category: "fleet",
    categoryLabel: "الأسطول والسائقين",
    description: "استمارة المركبة والتأمين والفحص الدوري وتواريخ التجديد.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف وثيقة المركبة" },
      { name: "vehicle_id", type: "bigint", key: "FK", desc: "مرجع المركبة", ref: "vehicles.id" },
      { name: "document_type", type: "varchar(50)", key: "", desc: "نوع الوثيقة (registration, insurance, inspection)" },
      { name: "file_path", type: "varchar(255)", key: "", desc: "رابط الوثيقة" },
      { name: "expiry_date", type: "date", key: "", desc: "تاريخ انتهاء سريان الوثيقة" },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة التوثيق" }
    ]
  },

  // --- MODULE 3: GEOGRAPHY & SCHOOLS ---
  {
    name: "areas",
    arabicName: "المناطق الجغرافية",
    category: "routes",
    categoryLabel: "المسارات والمدارس",
    description: "تقسيم المدن إلى أحياء ومناطق خدمة جغرافية لتنظيم النقل.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف المنطقة" },
      { name: "name", type: "varchar(100)", key: "", desc: "اسم الحي أو المنطقة الجغرافية" },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة التغطية الخدمية" }
    ]
  },
  {
    name: "addresses",
    arabicName: "العناوين والإحداثيات",
    category: "routes",
    categoryLabel: "المسارات والمدارس",
    description: "نقاط التجمع وعناوين المنازل وإحداثيات GPS الدقيقة.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف العنوان" },
      { name: "area_id", type: "bigint", key: "FK", desc: "مرجع المنطقة", ref: "areas.id" },
      { name: "label", type: "varchar(100)", key: "", desc: "تسمية المكان (e.g. منزل الطالب أحمد)" },
      { name: "address_text", type: "varchar(255)", key: "", desc: "الوصف النصي واسم الشارع" },
      { name: "latitude", type: "decimal(10,8)", key: "", desc: "إحداثي خط العرض GPS" },
      { name: "longitude", type: "decimal(11,8)", key: "", desc: "إحداثي خط الطول GPS" }
    ]
  },
  {
    name: "schools",
    arabicName: "المدارس والمنشآت",
    category: "routes",
    categoryLabel: "المسارات والمدارس",
    description: "بيانات المدارس المستهدفة بالنقل ومواقعها الجغرافية.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف المدرسة" },
      { name: "area_id", type: "bigint", key: "FK", desc: "مرجع المنطقة", ref: "areas.id" },
      { name: "name", type: "varchar(255)", key: "", desc: "اسم المدرسة أو المجمع التعليمي" },
      { name: "address", type: "varchar(255)", key: "", desc: "عنوان المدرسة" },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة تفعيل المدرسة في النظام" }
    ]
  },
  {
    name: "routes",
    arabicName: "المسارات وخطوط السير",
    category: "routes",
    categoryLabel: "المسارات والمدارس",
    description: "خطوط سير الحافلات ومواعيد انطلاقها.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف المسار" },
      { name: "area_id", type: "bigint", key: "FK", desc: "مرجع المنطقة التابع لها المسار", ref: "areas.id" },
      { name: "name", type: "varchar(100)", key: "", desc: "اسم الخط (e.g. مسار الياسمين - مدرسة الرياض)" },
      { name: "direction", type: "varchar(20)", key: "", desc: "اتجاه المسار (morning, afternoon)" },
      { name: "scheduled_time", type: "time", key: "", desc: "وقت انطلاق المسار المجدول" },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة المسار (active, draft, inactive)" }
    ]
  },
  {
    name: "route_stops",
    arabicName: "محطات توقف المسار",
    category: "routes",
    categoryLabel: "المسارات والمدارس",
    description: "المحطات ونقاط الصعود والنزول المرتبة على طول خط السير.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف المحطة" },
      { name: "route_id", type: "bigint", key: "FK", desc: "مرجع المسار", ref: "routes.id" },
      { name: "address_id", type: "bigint", key: "FK", desc: "مرجع العنوان الجغرافي للمحطة", ref: "addresses.id" },
      { name: "stop_order", type: "int", key: "", desc: "ترتيب التوقف (1, 2, 3...)" },
      { name: "estimated_time", type: "time", key: "", desc: "الوقت المقدر للوصول للمحطة" }
    ]
  },
  {
    name: "route_schools",
    arabicName: "مدارس المسار",
    category: "routes",
    categoryLabel: "المسارات والمدارس",
    description: "جدول وسيط لربط المسار بالمدارس التي يخدمها في وجهته.",
    status: "core",
    fields: [
      { name: "route_id", type: "bigint", key: "PK,FK", desc: "مرجع المسار", ref: "routes.id" },
      { name: "school_id", type: "bigint", key: "PK,FK", desc: "مرجع المدرسة", ref: "schools.id" }
    ]
  },

  // --- MODULE 4: CHILDREN & GUARDIANS ---
  {
    name: "children",
    arabicName: "الطلاب والأطفال",
    category: "children",
    categoryLabel: "الطلاب وأولياء الأمور",
    description: "بيانات الطلاب المنقولين ومدرستهم وملاحظاتهم الطبية والصحية.",
    status: "modified",
    badgeText: "محدّث",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف الطالب" },
      { name: "parent_user_id", type: "bigint", key: "FK", desc: "ولي أمر الطالب", ref: "parent_profiles.id" },
      { name: "school_id", type: "bigint", key: "FK", desc: "مدرسة الطالب المسجل بها", ref: "schools.id", isNew: true },
      { name: "name", type: "varchar(255)", key: "", desc: "اسم الطالب ثلاثي" },
      { name: "birth_date", type: "date", key: "", desc: "تاريخ الميلاد" },
      { name: "grade", type: "varchar(50)", key: "", desc: "الصف والمرحلة الدراسية (e.g. الصف الثالث)", isNew: true },
      { name: "medical_notes", type: "text", key: "", desc: "ملاحظات صحية طارئة (حساسية، ربو، إلخ)", isNew: true },
      { name: "notes", type: "varchar(255)", key: "", desc: "ملاحظات عامة لولي الأمر" },
      { name: "is_active", type: "boolean", key: "", desc: "حالة تفعيل الطالب في الخدمة" }
    ]
  },
  {
    name: "child_addresses",
    arabicName: "عناوين الطالب",
    category: "children",
    categoryLabel: "الطلاب وأولياء الأمور",
    description: "عناوين الركوب والنزول المتعددة الخاصة بالطالب (المنزل، بيت الجدة).",
    status: "core",
    fields: [
      { name: "child_id", type: "bigint", key: "PK,FK", desc: "مرجع الطالب", ref: "children.id" },
      { name: "address_id", type: "bigint", key: "PK,FK", desc: "مرجع العنوان", ref: "addresses.id" },
      { name: "address_type", type: "varchar(50)", key: "", desc: "نوع العنوان (morning_pickup, afternoon_drop)" },
      { name: "is_default", type: "boolean", key: "", desc: "هل هو العنوان الافتراضي" }
    ]
  },
  {
    name: "child_absences",
    arabicName: "طلبات الغياب المسبق للطلاب",
    category: "children",
    categoryLabel: "الطلاب وأولياء الأمور",
    description: "إشعار مسبق من ولي الأمر بعدم حضور الطالب لتفادي انتظار الحافلة أمام منزله.",
    status: "new",
    badgeText: "جديد",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف طلب الغياب", isNew: true },
      { name: "child_id", type: "bigint", key: "FK", desc: "مرجع الطالب في children", ref: "children.id", isNew: true },
      { name: "absence_date", type: "date", key: "", desc: "تاريخ يوم الغياب", isNew: true },
      { name: "trip_direction", type: "varchar(20)", key: "", desc: "الفترة (morning, afternoon, both_ways)", isNew: true },
      { name: "reason", type: "varchar(255)", key: "", desc: "سبب الغياب (مرض، سفر، عذر عائلي)", isNew: true },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة الطلب (acknowledged, pending)", isNew: true }
    ]
  },
  {
    name: "authorized_pickups",
    arabicName: "الأشخاص المصرح لهم بالاستلام",
    category: "children",
    categoryLabel: "الطلاب وأولياء الأمور",
    description: "بيانات الأقارب والمرافقين المعتمدين لاستلام الطفل من الحافلة بأمان.",
    status: "new",
    badgeText: "جديد",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف الشخص المصرح له", isNew: true },
      { name: "child_id", type: "bigint", key: "FK", desc: "مرجع الطالب", ref: "children.id", isNew: true },
      { name: "name", type: "varchar(255)", key: "", desc: "اسم الشخص الكامل", isNew: true },
      { name: "relationship", type: "varchar(50)", key: "", desc: "صلة القرابة (جد، عم، خالة، سائق خاص)", isNew: true },
      { name: "phone", type: "varchar(20)", key: "", desc: "رقم هاتف الشخص للتواصل", isNew: true },
      { name: "national_id", type: "varchar(30)", key: "", desc: "رقم الهوية الوطنية للتحقق", isNew: true },
      { name: "photo_url", type: "varchar(255)", key: "", desc: "رابط صورة الشخص للتعرف البصري", isNew: true },
      { name: "is_active", type: "boolean", key: "", desc: "حالة التفعيل وصلاحية الاستلام", isNew: true }
    ]
  },

  // --- MODULE 5: SUBSCRIPTIONS & FINANCE ---
  {
    name: "subscriptions",
    arabicName: "الاشتراكات المدرسية",
    category: "finance",
    categoryLabel: "الاشتراكات والمالية",
    description: "عقود اشتراك الطلاب في المسارات مع تحديد نوع الباقة والاتجاه.",
    status: "modified",
    badgeText: "محدّث",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف الاشتراك" },
      { name: "child_id", type: "bigint", key: "FK", desc: "مرجع الطالب المشترك", ref: "children.id" },
      { name: "route_id", type: "bigint", key: "FK", desc: "مرجع المسار (تم التعديل من assignment_id)", ref: "routes.id", isNew: true },
      { name: "service_type", type: "varchar(30)", key: "", desc: "نوع الخدمة (morning_only, afternoon_only, round_trip)", isNew: true },
      { name: "start_date", type: "date", key: "", desc: "تاريخ بداية الاشتراك (بداية الترم/الشهر)" },
      { name: "end_date", type: "date", key: "", desc: "تاريخ نهاية الاشتراك" },
      { name: "monthly_price", type: "decimal(10,2)", key: "", desc: "سعر الاشتراك الشهري أو الفصلي" },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة الاشتراك (active, pending, expired, cancelled)" }
    ]
  },
  {
    name: "payments",
    arabicName: "المدفوعات والفواتير",
    category: "finance",
    categoryLabel: "الاشتراكات والمالية",
    description: "سجل العمليات المالية وسداد الاشتراكات وطرق الدفع والإيصالات.",
    status: "new",
    badgeText: "جديد",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف عملية الدفع", isNew: true },
      { name: "subscription_id", type: "bigint", key: "FK", desc: "مرجع الاشتراك المسدد عنه", ref: "subscriptions.id", isNew: true },
      { name: "amount", type: "decimal(10,2)", key: "", desc: "المبلغ المدفوع بالريال/العملة", isNew: true },
      { name: "payment_method", type: "varchar(50)", key: "", desc: "طريقة السداد (credit_card, mada, apple_pay, bank_transfer, cash)", isNew: true },
      { name: "transaction_reference", type: "varchar(100)", key: "", desc: "الرقم المرجعي من بوابة الدفع الإلكتروني", isNew: true },
      { name: "receipt_url", type: "varchar(255)", key: "", desc: "رابط صورة إيصال التحويل البنكي اليدوي", isNew: true },
      { name: "payment_date", type: "datetime", key: "", desc: "تاريخ وتوقيت العملية المالي", isNew: true },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة السداد (paid, pending, failed, refunded)", isNew: true }
    ]
  },

  // --- MODULE 6: OPERATIONS & TRIPS ---
  {
    name: "route_assignments",
    arabicName: "تكليفات المسارات والمشرفات",
    category: "operations",
    categoryLabel: "العمليات والرحلات",
    description: "إسناد الحافلة والسائق والمشرفة للمسار لفترة زمنية محددة.",
    status: "modified",
    badgeText: "محدّث",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف التكليف" },
      { name: "driver_vehicle_id", type: "bigint", key: "FK", desc: "مرجع السائق والمركبة", ref: "driver_vehicles.id" },
      { name: "supervisor_id", type: "bigint", key: "FK", desc: "مرجع المشرفة المعينة في الحافلة", ref: "supervisor_profiles.id", isNew: true },
      { name: "start_date", type: "date", key: "", desc: "تاريخ بداية التكليف" },
      { name: "end_date", type: "date", key: "", desc: "تاريخ نهاية التكليف" },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة التكليف (active, completed)" }
    ]
  },
  {
    name: "assignment_routes",
    arabicName: "ربط التكليف بالمسارات",
    category: "operations",
    categoryLabel: "العمليات والرحلات",
    description: "تحديد المسارات التي ينفذها تكليف معين مع تحديد الاتجاه.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف الربط" },
      { name: "assignment_id", type: "bigint", key: "FK", desc: "مرجع التكليف", ref: "route_assignments.id" },
      { name: "route_id", type: "bigint", key: "FK", desc: "مرجع المسار", ref: "routes.id" },
      { name: "direction", type: "varchar(20)", key: "", desc: "الاتجاه التشغيلي للمسار" }
    ]
  },
  {
    name: "trips",
    arabicName: "الرحلات اليومية الفعلية",
    category: "operations",
    categoryLabel: "العمليات والرحلات",
    description: "سجل الرحلة الميدانية اليومية المنفذة ومواعيد بدء وانطلاق وانتهاء الرحلة.",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف الرحلة اليومية" },
      { name: "assignment_route_id", type: "bigint", key: "FK", desc: "مرجع مسار التكليف", ref: "assignment_routes.id" },
      { name: "trip_date", type: "date", key: "", desc: "تاريخ تنفيذ الرحلة" },
      { name: "direction", type: "varchar(20)", key: "", desc: "اتجاه الرحلة (morning, afternoon)" },
      { name: "scheduled_at", type: "datetime", key: "", desc: "التوقيت المجدول للبدء" },
      { name: "started_at", type: "datetime", key: "", desc: "التوقيت الفعلي لانطلاق الحافلة" },
      { name: "completed_at", type: "datetime", key: "", desc: "توقيت انتهاء وإنزال جميع الطلاب" },
      { name: "status", type: "varchar(20)", key: "", desc: "حالة الرحلة (scheduled, in_progress, completed, cancelled)" }
    ]
  },
  {
    name: "trip_children",
    arabicName: "حضور وصعود الطلاب في الرحلة",
    category: "operations",
    categoryLabel: "العمليات والرحلات",
    description: "تحضير الطلاب وتوقيت الصعود والنزول الآمن مع رمز التحقق.",
    status: "modified",
    badgeText: "محدّث",
    fields: [
      { name: "trip_id", type: "bigint", key: "PK,FK", desc: "مرجع الرحلة", ref: "trips.id" },
      { name: "child_id", type: "bigint", key: "PK,FK", desc: "مرجع الطالب", ref: "children.id" },
      { name: "attendance_status", type: "varchar(20)", key: "", desc: "حالة الحضور (present, absent, excused)" },
      { name: "verification_code", type: "varchar(10)", key: "", desc: "رمز التحقق أو OTP لتأكيد التسليم الآمن", isNew: true },
      { name: "pickup_time", type: "datetime", key: "", desc: "توقيت صعود الطالب في الحافلة بدقة" },
      { name: "dropoff_time", type: "datetime", key: "", desc: "توقيت نزول الطالب وتسليمه" },
      { name: "notes", type: "varchar(255)", key: "", desc: "ملاحظات المشرفة أثناء الركوب" }
    ]
  },
  {
    name: "trip_incidents",
    arabicName: "سجل حوادث وطوارئ الرحلة",
    category: "safety",
    categoryLabel: "الأمان والتتبع",
    description: "توثيق أي طارئ (عطل بالحافلة، حادث مروري، وعكة صحية لطالب).",
    status: "core",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف الحادثة" },
      { name: "trip_id", type: "bigint", key: "FK", desc: "مرجع الرحلة التي وقع بها الحادث", ref: "trips.id" },
      { name: "child_id", type: "bigint", key: "FK", desc: "مرجع الطالب المعني (إن وجد)", ref: "children.id" },
      { name: "incident_type", type: "varchar(50)", key: "", desc: "نوع الحادث (breakdown, delay, medical, accident)" },
      { name: "description", type: "text", key: "", desc: "الوصف التفصيلي للإجراء والواقعة" },
      { name: "reported_at", type: "datetime", key: "", desc: "توقيت التبليغ" }
    ]
  },
  {
    name: "trip_locations",
    arabicName: "سجل التتبع اللحظي للسرعة والموقع",
    category: "safety",
    categoryLabel: "الأمان والتتبع",
    description: "إحداثيات GPS وسرعة الحافلة دورياً أثناء الرحلة لعرضها على الخريطة ومراقبة السرعة.",
    status: "new",
    badgeText: "جديد",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف نقطة التتبع", isNew: true },
      { name: "trip_id", type: "bigint", key: "FK", desc: "مرجع الرحلة الجارية", ref: "trips.id", isNew: true },
      { name: "latitude", type: "decimal(10,8)", key: "", desc: "إحداثي خط العرض GPS", isNew: true },
      { name: "longitude", type: "decimal(11,8)", key: "", desc: "إحداثي خط الطول GPS", isNew: true },
      { name: "speed", type: "decimal(5,2)", key: "", desc: "سرعة الحافلة بالكم/ساعة", isNew: true },
      { name: "recorded_at", type: "datetime", key: "", desc: "التوقيت الدقيق لتسجيل الإحداثي", isNew: true }
    ]
  },
  {
    name: "trip_reviews",
    arabicName: "تقييمات الرحلات والسائقين",
    category: "safety",
    categoryLabel: "الأمان والتتبع",
    description: "تقييم ولي الأمر لأداء السائق ونظافة الحافلة والانضباط بالمواعيد.",
    status: "new",
    badgeText: "جديد",
    fields: [
      { name: "id", type: "bigint", key: "PK", desc: "معرف التقييم", isNew: true },
      { name: "trip_id", type: "bigint", key: "FK", desc: "مرجع الرحلة المنفذة", ref: "trips.id", isNew: true },
      { name: "parent_id", type: "bigint", key: "FK", desc: "ولي الأمر صاحب التقييم", ref: "parent_profiles.id", isNew: true },
      { name: "driver_id", type: "bigint", key: "FK", desc: "السائق المقيَم", ref: "driver_profiles.id", isNew: true },
      { name: "rating", type: "int", key: "", desc: "التقييم من 1 إلى 5 نجوم", isNew: true },
      { name: "comment", type: "text", key: "", desc: "ملاحظات وتغذية راجعة من ولي الأمر", isNew: true },
      { name: "created_at", type: "datetime", key: "", desc: "توقيت تسجيل المراجعة", isNew: true }
    ]
  }
];

// --- RENDER FUNCTIONALITY ---
document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("tablesGrid");
  const searchInput = document.getElementById("searchInput");
  const categoryPills = document.querySelectorAll(".pill-btn");
  const tabBtns = document.querySelectorAll(".tab-btn");

  let currentCategory = "all";
  let searchQuery = "";

  function renderTables() {
    gridContainer.innerHTML = "";

    const filtered = schemaData.filter(table => {
      const matchesCategory = currentCategory === "all" || table.category === currentCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q || 
        table.name.toLowerCase().includes(q) ||
        table.arabicName.toLowerCase().includes(q) ||
        table.description.toLowerCase().includes(q) ||
        table.fields.some(f => f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3>لا توجد جداول تطابق بحثك</h3>
          <p>جرّب البحث بكلمة أخرى مثل "child" أو "trip" أو "payment"</p>
        </div>
      `;
      return;
    }

    filtered.forEach(table => {
      const card = document.createElement("div");
      card.className = `table-card ${table.status === 'new' ? 'is-new' : ''} ${table.status === 'modified' ? 'is-modified' : ''}`;
      card.id = `table-${table.name}`;

      let badgeHtml = "";
      if (table.status === "new") {
        badgeHtml = `<span class="badge badge-new">★ جديد</span>`;
      } else if (table.status === "modified") {
        badgeHtml = `<span class="badge badge-modified">✎ محدّث</span>`;
      }

      const rowsHtml = table.fields.map(field => {
        let keyBadge = "";
        if (field.key) {
          if (field.key.includes("PK")) {
            keyBadge += `<span class="key-tag key-pk">PK</span> `;
          }
          if (field.key.includes("FK")) {
            keyBadge += `<span class="key-tag key-fk">FK</span> `;
          }
          if (field.key.includes("UK")) {
            keyBadge += `<span class="key-tag key-uk">UK</span> `;
          }
        }

        let refHtml = "";
        if (field.ref) {
          refHtml = `<span class="target-ref">→ ${field.ref}</span>`;
        }

        return `
          <tr class="${field.isNew ? 'highlight-field' : ''}">
            <td>
              <div class="field-name-wrap">
                <span class="field-name">${field.name}</span>
                ${keyBadge}
              </div>
            </td>
            <td><span class="field-type">${field.type}</span></td>
            <td>
              <div class="field-desc">
                ${field.desc}
                ${refHtml}
              </div>
            </td>
          </tr>
        `;
      }).join("");

      card.innerHTML = `
        <div class="card-header">
          <div class="card-title-group">
            <span class="table-name">${table.name}</span>
            <span class="table-desc">${table.arabicName} • <small style="color:var(--text-subtle);">${table.categoryLabel}</small></span>
          </div>
          <div class="card-badges">
            ${badgeHtml}
            <span class="badge badge-count">${table.fields.length} حقول</span>
          </div>
        </div>
        <div class="card-body">
          <table class="fields-table">
            <thead>
              <tr>
                <th style="width: 32%;">اسم الحقل</th>
                <th style="width: 25%;">النوع</th>
                <th style="width: 43%;">الوصف والملاحظات</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      `;

      gridContainer.appendChild(card);
    });
  }

  // Live Search listener
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value.trim();
    renderTables();
  });

  // Category Filter Pills
  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.getAttribute("data-category");
      renderTables();
    });
  });

  // Tab View Switcher
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const targetView = btn.getAttribute("data-view");

      document.getElementById("viewGrid").style.display = targetView === "grid" ? "grid" : "none";
      document.getElementById("viewDiagram").style.display = targetView === "diagram" ? "block" : "none";
      document.getElementById("viewChangelog").style.display = targetView === "changelog" ? "block" : "none";
      document.getElementById("viewCode").style.display = targetView === "code" ? "block" : "none";

      if (targetView === "diagram" && window.mermaid) {
        window.mermaid.contentLoaded();
      }
    });
  });

  // Zoom Controls for Diagram
  let currentZoom = 1;
  const viewport = document.getElementById("mermaidViewport");
  const zoomInBtn = document.getElementById("zoomIn");
  const zoomOutBtn = document.getElementById("zoomOut");
  const zoomResetBtn = document.getElementById("zoomReset");

  if (zoomInBtn && zoomOutBtn && zoomResetBtn && viewport) {
    zoomInBtn.addEventListener("click", () => {
      currentZoom = Math.min(currentZoom + 0.15, 2.5);
      viewport.style.transform = `scale(${currentZoom})`;
    });
    zoomOutBtn.addEventListener("click", () => {
      currentZoom = Math.max(currentZoom - 0.15, 0.4);
      viewport.style.transform = `scale(${currentZoom})`;
    });
    zoomResetBtn.addEventListener("click", () => {
      currentZoom = 1;
      viewport.style.transform = `scale(1)`;
    });
  }

  // Initial render
  renderTables();
});

// Copy Code Helper
function copyCode(elementId, btn) {
  const code = document.getElementById(elementId).innerText;
  navigator.clipboard.writeText(code).then(() => {
    const originalText = btn.innerText;
    btn.innerText = "✓ تم النسخ بنجاح!";
    btn.style.background = "#10b981";
    setTimeout(() => {
      btn.innerText = originalText;
      btn.style.background = "";
    }, 2000);
  });
}
