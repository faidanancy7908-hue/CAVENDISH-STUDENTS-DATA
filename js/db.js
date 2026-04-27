// ============================================================
// UNIVERSITY STUDENT RECORDS MANAGEMENT SYSTEM
// Database Layer - js/db.js
// ============================================================

const DB_KEY = 'univ_db_v2';

const GRADE_MAP = { 'A+':4.0,'A':4.0,'A-':3.7,'B+':3.3,'B':3.0,'B-':2.7,'C+':2.3,'C':2.0,'C-':1.7,'D':1.0,'F':0.0 };

function marksToGrade(m) {
  if (m>=90) return 'A+'; if (m>=85) return 'A'; if (m>=80) return 'A-';
  if (m>=75) return 'B+'; if (m>=70) return 'B'; if (m>=65) return 'B-';
  if (m>=60) return 'C+'; if (m>=55) return 'C'; if (m>=50) return 'C-';
  if (m>=40) return 'D'; return 'F';
}

const SEED = {
  users: [
    {id:1,username:'admin',password:'admin123',role:'admin',name:'System Administrator',studentId:null,active:true,createdAt:'2024-01-01'},
    {id:2,username:'registry01',password:'registry123',role:'registry',name:'Mary Wanjiku',studentId:null,active:true,createdAt:'2024-01-01'},
    {id:3,username:'finance01',password:'finance123',role:'finance',name:'Peter Kamau',studentId:null,active:true,createdAt:'2024-01-01'},
    {id:4,username:'dr.smith',password:'lecturer123',role:'lecturer',name:'Dr. John Smith',studentId:null,active:true,createdAt:'2024-01-01',department:'Computer Science'},
    {id:5,username:'dr.jane',password:'lecturer123',role:'lecturer',name:'Dr. Jane Doe',studentId:null,active:true,createdAt:'2024-01-01',department:'Business'},
    {id:6,username:'STU2024001',password:'student123',role:'student',name:'Alice Johnson',studentId:'STU2024001',active:true,createdAt:'2024-01-15'},
    {id:7,username:'STU2024002',password:'student123',role:'student',name:'Bob Smith',studentId:'STU2024002',active:true,createdAt:'2024-01-15'},
    {id:8,username:'STU2024003',password:'student123',role:'student',name:'Carol White',studentId:'STU2024003',active:true,createdAt:'2024-01-15'},
  ],
  students: [
    {studentId:'STU2024001',name:'Alice Johnson',email:'alice.johnson@uni.edu',phone:'+256712345678',program:'Computer Science',year:2,address:'Ggaba Road, Kampala',status:'active',enrolledDate:'2023-09-01',gender:'Female',dob:'2002-03-15',nationality:'Ugandan',photo:'https://i.pravatar.cc/150?u=STU2024001'},
    {studentId:'STU2024002',name:'Bob Smith',email:'bob.smith@uni.edu',phone:'+256723456789',program:'Business Administration',year:1,address:'Kansanga, Kampala',status:'active',enrolledDate:'2024-01-15',gender:'Male',dob:'2003-07-22',nationality:'Kenyan',photo:'https://i.pravatar.cc/150?u=STU2024002'},
    {studentId:'STU2024003',name:'Carol White',email:'carol.white@uni.edu',phone:'+256734567890',program:'Civil Engineering',year:3,address:'Entebbe Road, Kampala',status:'active',enrolledDate:'2022-09-01',gender:'Female',dob:'2001-11-08',nationality:'Tanzanian',photo:'https://i.pravatar.cc/150?u=STU2024003'},
    {studentId:'STU2024004',name:'David Otieno',email:'david.otieno@uni.edu',phone:'+256745678901',program:'Computer Science',year:1,address:'Nsambya, Kampala',status:'active',enrolledDate:'2024-01-15',gender:'Male',dob:'2004-02-14',nationality:'Ugandan',photo:'https://i.pravatar.cc/150?u=STU2024004'},
    {studentId:'STU2024005',name:'Eva Mwangi',email:'eva.mwangi@uni.edu',phone:'+256756789012',program:'Medicine',year:2,address:'Mulago, Kampala',status:'inactive',enrolledDate:'2023-09-01',gender:'Female',dob:'2002-09-30',nationality:'Ugandan',photo:'https://i.pravatar.cc/150?u=STU2024005'},
  ],
  courses: [
    {courseCode:'CS101',title:'Introduction to Computer Science',creditUnits:3,department:'Computer Science',semester:'2024/1',lecturerId:4,description:'Fundamentals of computing and programming'},
    {courseCode:'CS201',title:'Data Structures & Algorithms',creditUnits:4,department:'Computer Science',semester:'2024/1',lecturerId:4,description:'Advanced data structures and algorithm design'},
    {courseCode:'CS301',title:'Database Systems',creditUnits:3,department:'Computer Science',semester:'2024/1',lecturerId:4,description:'Relational databases and SQL'},
    {courseCode:'BA101',title:'Business Management Fundamentals',creditUnits:3,department:'Business Administration',semester:'2024/1',lecturerId:5,description:'Introduction to business management'},
    {courseCode:'BA201',title:'Marketing Principles',creditUnits:3,department:'Business Administration',semester:'2024/1',lecturerId:5,description:'Core marketing concepts and strategies'},
    {courseCode:'ENG101',title:'Engineering Mathematics',creditUnits:4,department:'Engineering',semester:'2024/1',lecturerId:4,description:'Mathematical foundations for engineering'},
    {courseCode:'GEN101',title:'Communication Skills',creditUnits:2,department:'General Studies',semester:'2024/1',lecturerId:5,description:'Professional communication and writing'},
    {courseCode:'MED101',title:'Human Anatomy',creditUnits:5,department:'Medicine',semester:'2024/1',lecturerId:4,description:'Structure and organization of the human body'},
  ],
  enrollments: [
    {id:1,studentId:'STU2024001',courseCode:'CS101',semester:'2024/1',enrolledDate:'2024-01-20'},
    {id:2,studentId:'STU2024001',courseCode:'CS201',semester:'2024/1',enrolledDate:'2024-01-20'},
    {id:3,studentId:'STU2024001',courseCode:'GEN101',semester:'2024/1',enrolledDate:'2024-01-20'},
    {id:4,studentId:'STU2024002',courseCode:'BA101',semester:'2024/1',enrolledDate:'2024-01-22'},
    {id:5,studentId:'STU2024002',courseCode:'BA201',semester:'2024/1',enrolledDate:'2024-01-22'},
    {id:6,studentId:'STU2024003',courseCode:'ENG101',semester:'2024/1',enrolledDate:'2024-01-18'},
    {id:7,studentId:'STU2024003',courseCode:'CS301',semester:'2024/1',enrolledDate:'2024-01-18'},
    {id:8,studentId:'STU2024004',courseCode:'CS101',semester:'2024/1',enrolledDate:'2024-01-25'},
    {id:9,studentId:'STU2024004',courseCode:'GEN101',semester:'2024/1',enrolledDate:'2024-01-25'},
  ],
  payments: [
    {id:1,studentId:'STU2024001',amount:25000,date:'2024-01-15',method:'Bank Transfer',reference:'TXN2024001',notes:'Semester 1 fees partial'},
    {id:2,studentId:'STU2024001',amount:15000,date:'2024-02-01',method:'M-Pesa',reference:'TXN2024002',notes:'Balance payment'},
    {id:3,studentId:'STU2024002',amount:20000,date:'2024-01-20',method:'Cash',reference:'TXN2024003',notes:'Partial payment'},
    {id:4,studentId:'STU2024003',amount:55000,date:'2024-01-10',method:'Bank Transfer',reference:'TXN2024004',notes:'Full semester payment'},
    {id:5,studentId:'STU2024004',amount:10000,date:'2024-01-25',method:'M-Pesa',reference:'TXN2024005',notes:'Deposit'},
  ],
  results: [
    {id:1,studentId:'STU2024001',courseCode:'CS101',semester:'2024/1',marks:87,grade:'A',gradedBy:4,gradedDate:'2024-04-01'},
    {id:2,studentId:'STU2024001',courseCode:'CS201',semester:'2024/1',marks:74,grade:'B',gradedBy:4,gradedDate:'2024-04-01'},
    {id:3,studentId:'STU2024001',courseCode:'GEN101',semester:'2024/1',marks:91,grade:'A+',gradedBy:5,gradedDate:'2024-04-02'},
    {id:4,studentId:'STU2024002',courseCode:'BA101',semester:'2024/1',marks:68,grade:'B-',gradedBy:5,gradedDate:'2024-04-03'},
    {id:5,studentId:'STU2024003',courseCode:'ENG101',semester:'2024/1',marks:93,grade:'A+',gradedBy:4,gradedDate:'2024-04-01'},
    {id:6,studentId:'STU2024003',courseCode:'CS301',semester:'2024/1',marks:79,grade:'B+',gradedBy:4,gradedDate:'2024-04-01'},
    {id:7,studentId:'STU2024004',courseCode:'CS101',semester:'2024/1',marks:55,grade:'C',gradedBy:4,gradedDate:'2024-04-02'},
  ],
  finance: [
    {id:1,studentId:'STU2024001',totalFees:50000,amountPaid:40000,balance:10000,cleared:false},
    {id:2,studentId:'STU2024002',totalFees:45000,amountPaid:20000,balance:25000,cleared:false},
    {id:3,studentId:'STU2024003',totalFees:55000,amountPaid:55000,balance:0,cleared:true},
    {id:4,studentId:'STU2024004',totalFees:45000,amountPaid:10000,balance:35000,cleared:false},
    {id:5,studentId:'STU2024005',totalFees:60000,amountPaid:0,balance:60000,cleared:false},
  ]
};

// ─── Core DB Functions ───────────────────────────────────────

function getDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    localStorage.setItem(DB_KEY, JSON.stringify(SEED));
    return JSON.parse(JSON.stringify(SEED));
  }
  return JSON.parse(raw);
}

function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

function resetDB() {
  localStorage.setItem(DB_KEY, JSON.stringify(SEED));
}

// ─── Users ───────────────────────────────────────────────────

const Users = {
  all: () => getDB().users,
  find: (id) => getDB().users.find(u => u.id === id),
  findByUsername: (u) => getDB().users.find(x => x.username === u),
  create: (data) => {
    const db = getDB();
    const id = Math.max(0, ...db.users.map(u => u.id)) + 1;
    const user = { ...data, id, createdAt: new Date().toISOString().split('T')[0], active: true };
    db.users.push(user);
    saveDB(db);
    return user;
  },
  update: (id, data) => {
    const db = getDB();
    const idx = db.users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    db.users[idx] = { ...db.users[idx], ...data };
    saveDB(db);
    return db.users[idx];
  },
  delete: (id) => {
    const db = getDB();
    db.users = db.users.filter(u => u.id !== id);
    saveDB(db);
  }
};

// ─── Students ─────────────────────────────────────────────────

const Students = {
  all: () => getDB().students,
  find: (sid) => getDB().students.find(s => s.studentId === sid),
  exists: (sid) => !!getDB().students.find(s => s.studentId === sid),
  create: (data) => {
    const db = getDB();
    if (db.students.find(s => s.studentId === data.studentId)) throw new Error('Duplicate Student ID');
    db.students.push(data);
    // Auto-create finance record
    const fid = Math.max(0, ...db.finance.map(f => f.id)) + 1;
    db.finance.push({ id: fid, studentId: data.studentId, totalFees: 45000, amountPaid: 0, balance: 45000, cleared: false });
    saveDB(db);
    return data;
  },
  update: (sid, data) => {
    const db = getDB();
    const idx = db.students.findIndex(s => s.studentId === sid);
    if (idx === -1) return null;
    db.students[idx] = { ...db.students[idx], ...data };
    saveDB(db);
    return db.students[idx];
  },
  delete: (sid) => {
    const db = getDB();
    db.students = db.students.filter(s => s.studentId !== sid);
    db.enrollments = db.enrollments.filter(e => e.studentId !== sid);
    db.finance = db.finance.filter(f => f.studentId !== sid);
    db.results = db.results.filter(r => r.studentId !== sid);
    db.payments = db.payments.filter(p => p.studentId !== sid);
    saveDB(db);
  }
};

// ─── Courses ──────────────────────────────────────────────────

const Courses = {
  all: () => getDB().courses,
  find: (code) => getDB().courses.find(c => c.courseCode === code),
  create: (data) => {
    const db = getDB();
    if (db.courses.find(c => c.courseCode === data.courseCode)) throw new Error('Duplicate Course Code');
    db.courses.push(data);
    saveDB(db);
    return data;
  },
  update: (code, data) => {
    const db = getDB();
    const idx = db.courses.findIndex(c => c.courseCode === code);
    if (idx === -1) return null;
    db.courses[idx] = { ...db.courses[idx], ...data };
    saveDB(db);
    return db.courses[idx];
  },
  delete: (code) => {
    const db = getDB();
    db.courses = db.courses.filter(c => c.courseCode !== code);
    saveDB(db);
  }
};

// ─── Enrollments ──────────────────────────────────────────────

const Enrollments = {
  all: () => getDB().enrollments,
  forStudent: (sid) => getDB().enrollments.filter(e => e.studentId === sid),
  forCourse: (code) => getDB().enrollments.filter(e => e.courseCode === code),
  isEnrolled: (sid, code, sem) => !!getDB().enrollments.find(e => e.studentId===sid && e.courseCode===code && e.semester===sem),
  create: (data) => {
    const db = getDB();
    const student = db.students.find(s => s.studentId === data.studentId);
    if (!student) throw new Error('Student not found');
    if (student.status !== 'active') throw new Error('Student is not active');
    if (db.enrollments.find(e => e.studentId===data.studentId && e.courseCode===data.courseCode && e.semester===data.semester))
      throw new Error('Already enrolled in this course for this semester');
    const id = Math.max(0, ...db.enrollments.map(e => e.id)) + 1;
    const enrollment = { ...data, id, enrolledDate: new Date().toISOString().split('T')[0] };
    db.enrollments.push(enrollment);
    saveDB(db);
    return enrollment;
  },
  delete: (id) => {
    const db = getDB();
    db.enrollments = db.enrollments.filter(e => e.id !== id);
    saveDB(db);
  }
};

// ─── Finance ──────────────────────────────────────────────────

const Finance = {
  all: () => getDB().finance,
  forStudent: (sid) => getDB().finance.find(f => f.studentId === sid),
  updateBalance: (sid) => {
    const db = getDB();
    const fidx = db.finance.findIndex(f => f.studentId === sid);
    if (fidx === -1) return;
    const paid = db.payments.filter(p => p.studentId === sid).reduce((s,p) => s + p.amount, 0);
    db.finance[fidx].amountPaid = paid;
    db.finance[fidx].balance = db.finance[fidx].totalFees - paid;
    db.finance[fidx].cleared = db.finance[fidx].balance <= 0;
    saveDB(db);
    return db.finance[fidx];
  },
  update: (sid, data) => {
    const db = getDB();
    const idx = db.finance.findIndex(f => f.studentId === sid);
    if (idx === -1) return null;
    db.finance[idx] = { ...db.finance[idx], ...data };
    saveDB(db);
    return db.finance[idx];
  }
};

// ─── Payments ─────────────────────────────────────────────────

const Payments = {
  all: () => getDB().payments,
  forStudent: (sid) => getDB().payments.filter(p => p.studentId === sid),
  create: (data) => {
    const db = getDB();
    const id = Math.max(0, ...db.payments.map(p => p.id)) + 1;
    const payment = { ...data, id };
    db.payments.push(payment);
    saveDB(db);
    Finance.updateBalance(data.studentId);
    return payment;
  },
  delete: (id) => {
    const db = getDB();
    const p = db.payments.find(x => x.id === id);
    db.payments = db.payments.filter(x => x.id !== id);
    saveDB(db);
    if (p) Finance.updateBalance(p.studentId);
  }
};

// ─── Results ──────────────────────────────────────────────────

const Results = {
  all: () => getDB().results,
  forStudent: (sid) => getDB().results.filter(r => r.studentId === sid),
  forCourse: (code) => getDB().results.filter(r => r.courseCode === code),
  calcGPA: (sid) => {
    const db = getDB();
    const results = db.results.filter(r => r.studentId === sid && r.grade !== 'F');
    if (!results.length) return { gpa: 0, cgpa: 0 };
    let totalPoints = 0, totalCredits = 0;
    results.forEach(r => {
      const course = db.courses.find(c => c.courseCode === r.courseCode);
      const credits = course ? course.creditUnits : 3;
      totalPoints += (GRADE_MAP[r.grade] || 0) * credits;
      totalCredits += credits;
    });
    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    return { gpa, cgpa: gpa, totalCredits };
  },
  upsert: (data) => {
    const db = getDB();
    const idx = db.results.findIndex(r => r.studentId===data.studentId && r.courseCode===data.courseCode && r.semester===data.semester);
    const grade = marksToGrade(data.marks);
    if (idx === -1) {
      const id = Math.max(0, ...db.results.map(r => r.id)) + 1;
      db.results.push({ ...data, id, grade, gradedDate: new Date().toISOString().split('T')[0] });
    } else {
      db.results[idx] = { ...db.results[idx], ...data, grade, gradedDate: new Date().toISOString().split('T')[0] };
    }
    saveDB(db);
  },
  delete: (id) => {
    const db = getDB();
    db.results = db.results.filter(r => r.id !== id);
    saveDB(db);
  }
};
