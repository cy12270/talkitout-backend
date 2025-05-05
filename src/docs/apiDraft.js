const CounselorSchema = {
  required: [
    'id',
    'title',
    'contact',
    'qualifications',
    'languages',
    'shortDescription',
    'practitionerType',
    'registeredClinicAddress',
    'clientTypes',
    'hasInsurance',
    'status',
    'registeredAt'
  ],
  properties: {
    id: Number,
    title: String,
    contact: String,
    qualifications: [String],
    languages: {
      type: [String],
      enum: ['cantonese', 'english', 'mandarin']
    },
    shortDescription: String,
    practitionerType: {
      type: String,
      enum: ['socialWorker', 'counselor', 'psychologist']
    },
    registeredClinicAddress: [
      {
        required: ['clinicNameZh', 'clinicNameEn', 'fullAddressZh', 'fullAddressEn'],
        properties: {
          clinicNameZh: String,
          clinicNameEn: String,
          fullAddressZh: String,
          fullAddressEn: String
        }
      }
    ],
    clientTypes: {
      type: [String],
      enum: ['individuals', 'couples', 'childrenTeens', 'family', 'group']
    },
    hasInsurance: Boolean,
    practitionMode: {
      type: String,
      enum: ['online', 'inPerson']
    },
    isEmailVisible: Boolean,
    isContactVisible: Boolean,
    isFullAddressVisible: Boolean,
    profilePictureUris: [String],
    certificateUris: [String],
    websiteUrl: [String],
    memberships: [String],
    profile: String,
    lowerPrice: Number,
    upperPrice: Number,
    gender: {
      type: [String],
      enum: ['male', 'female', 'nonBinary', 'other']
    },
    topics: [String],
    therapyTypes: [String],
    isCertified: Boolean,
    practitionClinicAddresses: [
      {
        required: [
          'clinicNameZh',
          'clinicNameEn',
          'fullAddressZh',
          'fullAddressEn',
          'locationZh',
          'locationEn'
        ],
        properties: {
          clinicNameZh: String,
          clinicNameEn: String,
          fullAddressZh: String,
          fullAddressEn: String,
          locationZh: String,
          locationEn: String
        }
      }
    ],
    specialties: [String],
    status: {
      type: String,
      enum: [
        'registered',
        'accepted',
        'profileCreated',
        'activated',
        'deactivated',
        'rejected'
      ]
    },
    registeredAt: Date,
    acceptedAt: Date,
    profileCreatedAt: Date,
    activatedAt: Date,
    deactivatedAt: Date,
    rejectedAt: Date
  }
};


const ClientFormSchema = {
  counselorId: Number,
  receivedAt: Date
};

const UserSchema = {
  id: Number,
  userName: String,
  email: String,
  hashedPassword: String,
  role: {
    type: String,
    enum: [
      'admin',
      'counselor',
    ]
  },
  counselorId: { type: Number, nullable: true },
  status: {
    type: String,
    enum: [
      'active',
      'inactive',
    ]
  },
  createdAt: Date,
  updatedAt: Date
};

// APIs
// internal: for internal use, endpoint not exposed to public, able to be called in the same domain
// protected: endpoint exposed to public, able to be called by authorized user
// open: endpoint exposed to public, able to be called by any one

// Internal
// GET Health Check (to see whether backend server is connected to db and have read/write access)
// POST Bulk Insert Counselor (Insert multiple counselors for testing purpose/ when the app first launch)

// Protected
// POST Upsert User (Edit Counselor record, only operated by authorized user whose role is admin)

// Open
// POST Upsert User (Create new counselor record when registration form is submitted)
// GET Get Counselor by Id (Return most detailed to be displayed on the counselor details page)
// GET Query Counselors (Return paginated filtering results)
// POST Submit Client Form (Redirect form to counselor thru email as well as create record in db to count total number of cilent form of certain counselor receive)
// POST Submit Inquires (Redirect Inquires form to talkitout thru email )
// POST Submit Counselor Registration Form (Create Counselor record)
// POST Login (Only for admin in phase 1)

