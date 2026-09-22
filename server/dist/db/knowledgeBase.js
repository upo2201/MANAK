export const SOURCES = [
    {
        id: 'src-bis-portal',
        name: 'BIS Official Portal & Know Your Standard',
        organization: 'Bureau of Indian Standards',
        authorityLevel: 'Official BIS',
        url: 'https://www.bis.gov.in',
        lastVerifiedAt: '2026-03-01',
        isVerified: true
    },
    {
        id: 'src-manak-online',
        name: 'ManakOnline e-BIS Services Portal',
        organization: 'Bureau of Indian Standards',
        authorityLevel: 'Official BIS',
        url: 'https://www.manakonline.in',
        lastVerifiedAt: '2026-03-01',
        isVerified: true
    },
    {
        id: 'src-govt-qco',
        name: 'Gazette of India Quality Control Orders (QCOs)',
        organization: 'Ministry of Commerce and Industry / Ministry of Consumer Affairs',
        authorityLevel: 'Government Notification',
        url: 'https://dpiit.gov.in/quality-control-orders',
        lastVerifiedAt: '2026-02-15',
        isVerified: true
    },
    {
        id: 'src-hallmarking-portal',
        name: 'BIS Hallmarking & HUID Verification Service',
        organization: 'Bureau of Indian Standards Hallmarking Department',
        authorityLevel: 'Official BIS',
        url: 'https://www.bis.gov.in/hallmarking-overview/',
        lastVerifiedAt: '2026-02-20',
        isVerified: true
    }
];
export const STANDARDS = [
    {
        id: 'std-is-3042',
        isNumber: 'IS 3042:1990',
        title: 'Stainless Steel Pressure Cookers - Specification',
        description: 'Specifies safety, material, constructional, and performance requirements for domestic pressure cookers made of stainless steel equipped with safety valves and burst protection.',
        sector: 'Mechanical Engineering & Consumer Goods',
        productCategories: ['Cookware', 'Kitchenware', 'Pressure Cookers', 'Home Appliances'],
        status: 'Active',
        edition: 'Second Revision (Reaffirmed 2021)',
        publicationDate: '1990-05-15',
        isMandatory: true,
        sourceDocumentId: 'doc-is-3042',
        sourceUrl: 'https://www.bis.gov.in/product-certification/qco-pressure-cookers'
    },
    {
        id: 'std-is-10500',
        isNumber: 'IS 10500:2012',
        title: 'Drinking Water - Specification',
        description: 'Prescribes the essential physical, chemical, toxicological, and bacteriological requirements and methods of test for drinking water intended for human consumption.',
        sector: 'Chemical & Environmental Engineering',
        productCategories: ['Drinking Water', 'Public Utilities', 'Bottled & Piped Water'],
        status: 'Active',
        edition: 'Second Revision (Reaffirmed 2018)',
        publicationDate: '2012-04-12',
        isMandatory: true,
        sourceDocumentId: 'doc-is-10500',
        sourceUrl: 'https://www.bis.gov.in/know-your-standards/is-10500'
    },
    {
        id: 'std-is-14543',
        isNumber: 'IS 14543:2016',
        title: 'Packaged Drinking Water (Other Than Packaged Natural Mineral Water) - Specification',
        description: 'Specifies hygienic conditions, physical, chemical, and microbiological limits, testing, packaging, and marking requirements for packaged drinking water under mandatory ISI mark licensing.',
        sector: 'Food and Agriculture / Consumer Safety',
        productCategories: ['Packaged Drinking Water', 'Bottled Water', 'Beverages'],
        status: 'Active',
        edition: 'Third Revision',
        publicationDate: '2016-08-10',
        isMandatory: true,
        sourceDocumentId: 'doc-is-14543',
        sourceUrl: 'https://www.bis.gov.in/product-certification/compulsory-certification/'
    },
    {
        id: 'std-is-694',
        isNumber: 'IS 694:2010',
        title: 'Polyvinyl Chloride Insulated Cables for Working Voltages Up to and Including 1100 V',
        description: 'Covers single-core and multi-core PVC insulated unsheathed and sheathed electric cables for power and lighting installations in domestic and industrial wiring.',
        sector: 'Electrotechnical Engineering',
        productCategories: ['Electrical Cables', 'Wiring', 'PVC Insulated Cables'],
        status: 'Active',
        edition: 'Fourth Revision',
        publicationDate: '2010-09-01',
        isMandatory: true,
        sourceDocumentId: 'doc-is-694',
        sourceUrl: 'https://www.bis.gov.in/product-certification/qco-electrical-cables'
    },
    {
        id: 'std-is-1417',
        isNumber: 'IS 1417:2019',
        title: 'Gold and Gold Alloys, Jewellery/Artefacts - Fineness and Marking - Specification',
        description: 'Specifies fineness grades (24K, 23K, 22K, 20K, 18K, 14K) and mandatory hallmarking standards for gold jewellery, including HUID (Hallmark Unique Identification) application rules.',
        sector: 'Hallmarking & Precious Metals',
        productCategories: ['Gold Jewellery', 'Hallmarking', 'Precious Metals', 'Artefacts'],
        status: 'Active',
        edition: 'Fifth Revision',
        publicationDate: '2019-11-20',
        isMandatory: true,
        sourceDocumentId: 'doc-is-1417',
        sourceUrl: 'https://www.bis.gov.in/hallmarking-overview/is-1417'
    },
    {
        id: 'std-is-15820',
        isNumber: 'IS 15820:2009',
        title: 'General Requirements for Establishment and Operation of Assaying and Hallmarking Centres',
        description: 'Specifies criteria for operational infrastructure, fire assaying testing accuracy, laser marking procedures, and quality management systems for BIS-recognized Assaying and Hallmarking Centres (AHCs).',
        sector: 'Hallmarking & Conformity Assessment',
        productCategories: ['Assaying Centres', 'Testing Facilities', 'Hallmarking Accreditation'],
        status: 'Active',
        edition: 'First Revision',
        publicationDate: '2009-03-30',
        isMandatory: true,
        sourceDocumentId: 'doc-is-15820',
        sourceUrl: 'https://www.bis.gov.in/hallmarking-overview/ahc-guidelines'
    },
    {
        id: 'std-is-9873',
        isNumber: 'IS 9873 (Part 1):2019',
        title: 'Safety of Toys - Part 1: Safety Aspects Related to Mechanical and Physical Properties',
        description: 'Specifies requirements and test methods for toys intended for use by children. Covers sharp edges, small parts choke hazards, kinetic energy of projectiles, and structural integrity under QCO.',
        sector: 'Consumer Products & Safety',
        productCategories: ['Toys', 'Children Products', 'Safety Testing'],
        status: 'Active',
        edition: 'Second Revision',
        publicationDate: '2019-06-15',
        isMandatory: true,
        sourceDocumentId: 'doc-is-9873',
        sourceUrl: 'https://www.bis.gov.in/product-certification/qco-toys'
    },
    {
        id: 'std-is-16046',
        isNumber: 'IS 16046 (Part 1):2018',
        title: 'Secondary Cells and Batteries Containing Alkaline - Lithium-ion Cells & Batteries',
        description: 'Defines electrical performance and safety requirements for portable sealed secondary lithium cells and batteries used in smartphones, laptops, and portable electronics under CRS.',
        sector: 'Electronics & Information Technology',
        productCategories: ['Lithium-Ion Batteries', 'Electronic Components', 'CRS Electronics'],
        status: 'Active',
        edition: 'First Revision',
        publicationDate: '2018-08-25',
        isMandatory: true,
        sourceDocumentId: 'doc-is-16046',
        sourceUrl: 'https://www.crsbis.in/BIS/is16046'
    }
];
export const CERTIFICATION_SCHEMES = [
    {
        id: 'scheme-1-isi',
        name: 'Product Certification Scheme I (ISI Mark)',
        code: 'Scheme-I',
        description: 'The standard BIS Product Certification Scheme granting a Licence to use the Standard Mark (ISI Mark) on domestic or foreign manufactured products following factory inspection and laboratory conformity verification.',
        applicability: 'Applies to products covered under mandatory Quality Control Orders (QCOs) as well as voluntary certification for industrial and consumer goods.',
        processSteps: [
            { step: 1, title: 'Application Submission', detail: 'Submit online application on ManakOnline (Form I) with manufacturing details, factory layout, quality control plan, and test reports.' },
            { step: 2, title: 'Preliminary Factory Inspection', detail: 'BIS Inspecting Officer conducts on-site factory audit to verify manufacturing equipment, testing infrastructure, and quality assurance personnel.' },
            { step: 3, title: 'Sample Drawing & Independent Testing', detail: 'Factory samples drawn during inspection are sealed and dispatched to a BIS recognized laboratory for full conformity testing against relevant IS.' },
            { step: 4, title: 'Grant of Licence', detail: 'Upon satisfactory inspection and passing laboratory test reports, BIS issues the Licence (CML number) permitting ISI Mark printing.' },
            { step: 5, title: 'Surveillance Audits & Market Sampling', detail: 'BIS carries out periodic unannounced factory surveillance audits and draws random market samples to ensure continuous quality compliance.' }
        ],
        feeDisclaimer: 'Official BIS application, inspection, and marking fees are governed by Schedule II of BIS (Conformity Assessment) Regulations. Fee tables should be verified directly from the current official portal at manakonline.in.',
        sourceDocumentId: 'doc-scheme-1'
    },
    {
        id: 'scheme-2-crs',
        name: 'Compulsory Registration Scheme (CRS)',
        code: 'Scheme-II',
        description: 'Self-declaration of conformity registration scheme specifically designed for Electronics and Information Technology products notified under Ministry of Electronics and Information Technology (MeitY) orders.',
        applicability: 'Applies to 63+ electronic categories including laptops, tablets, mobile phones, power adapters, LED luminaires, and solar inverters.',
        processSteps: [
            { step: 1, title: 'Sample Testing in BIS Lab', detail: 'Manufacturer gets product tested at a BIS recognized laboratory in India as per applicable IS standard.' },
            { step: 2, title: 'Online Registration Application', detail: 'Apply on crsbis.in portal submitting laboratory test report, manufacturing location proof, and brand authorization.' },
            { step: 3, title: 'Scrutiny & Registration Grant', detail: 'BIS reviews report within statutory timeframe and issues Registration Number allowing standard CRS mark printing on product.' }
        ],
        feeDisclaimer: 'CRS registration fees and surveillance charges are fixed by BIS CRS guidelines and subject to statutory updates.',
        sourceDocumentId: 'doc-scheme-2'
    }
];
export const LABORATORIES = [
    {
        id: 'lab-bis-central',
        name: 'BIS Central Laboratory (CL)',
        location: 'Plot No. 20/9, Site IV, Sahibabad Industrial Area',
        city: 'Ghaziabad',
        state: 'Uttar Pradesh',
        lat: 28.6538,
        lng: 77.3468,
        testingScopes: ['Mechanical Safety', 'Chemical Analysis', 'Electrical Testing', 'Pressure Cooker Burst Testing', 'PVC Cable Flame Retardancy'],
        standardsSupported: ['IS 3042:1990', 'IS 10500:2012', 'IS 694:2010', 'IS 14543:2016'],
        contactEmail: 'cl@bis.gov.in',
        contactPhone: '+91-120-2770501',
        sourceDocumentId: 'doc-lab-cl'
    },
    {
        id: 'lab-bis-western',
        name: 'BIS Western Regional Office Laboratory (WROL)',
        location: 'Manakalaya, E9, MIDC, Behind Marol Telephone Exchange, Andheri (East)',
        city: 'Mumbai',
        state: 'Maharashtra',
        lat: 19.1176,
        lng: 72.8797,
        testingScopes: ['Food Testing', 'Water Analysis', 'Toy Mechanical Safety', 'Polymer Testing'],
        standardsSupported: ['IS 10500:2012', 'IS 14543:2016', 'IS 9873 (Part 1):2019', 'IS 3042:1990'],
        contactEmail: 'wrol@bis.gov.in',
        contactPhone: '+91-22-28329295',
        sourceDocumentId: 'doc-lab-wrol'
    },
    {
        id: 'lab-bis-southern',
        name: 'BIS Southern Regional Office Laboratory (SROL)',
        location: 'CIT Campus, IV Cross Road, Taramani',
        city: 'Chennai',
        state: 'Tamil Nadu',
        lat: 12.9863,
        lng: 80.2432,
        testingScopes: ['Electrotechnical Components', 'Battery Safety', 'PVC Cables', 'Chemical Testing'],
        standardsSupported: ['IS 694:2010', 'IS 16046 (Part 1):2018', 'IS 10500:2012'],
        contactEmail: 'srol@bis.gov.in',
        contactPhone: '+91-44-22541442',
        sourceDocumentId: 'doc-lab-srol'
    },
    {
        id: 'lab-bis-eastern',
        name: 'BIS Eastern Regional Office Laboratory (EROL)',
        location: '1/14 CIT Scheme VII M, VIP Road, Kankurgachi',
        city: 'Kolkata',
        state: 'West Bengal',
        lat: 22.5726,
        lng: 88.3912,
        testingScopes: ['Metallurgical Analysis', 'Fasteners Testing', 'Pressure Vessels', 'Water Microbiological Testing'],
        standardsSupported: ['IS 3042:1990', 'IS 1363 (Part 1):2019', 'IS 10500:2012', 'IS 14543:2016'],
        contactEmail: 'erol@bis.gov.in',
        contactPhone: '+91-33-23553243',
        sourceDocumentId: 'doc-lab-erol'
    }
];
export const HALLMARKING_CENTRES = [
    {
        id: 'ahc-delhi-01',
        name: 'Delhi Assay & Hallmarking Centre Pvt Ltd',
        location: 'Karol Bagh Jewellery Hub, 10224 Gurudwara Road',
        city: 'New Delhi',
        state: 'Delhi',
        centreCode: 'AHC/DL/001',
        services: ['XRF Non-Destructive Assay', 'Fire Assay Verification', 'Laser HUID Marking', 'Consumer Verification Service'],
        recognizedStatus: 'BIS Recognized AHC under IS 15820',
        sourceDocumentId: 'doc-ahc-dl'
    },
    {
        id: 'ahc-mumbai-01',
        name: 'Zaveri Bazaar Hallmarking Services',
        location: 'Zaveri Bazaar, Kalbadevi',
        city: 'Mumbai',
        state: 'Maharashtra',
        centreCode: 'AHC/MH/014',
        services: ['Gold Fineness Assaying', 'Laser HUID Engraving', 'Artefact Assay', 'Export Gold Certification'],
        recognizedStatus: 'BIS Recognized AHC under IS 15820',
        sourceDocumentId: 'doc-ahc-mh'
    }
];
export const DOCUMENT_CHUNKS = [
    {
        id: 'chk-3042-01',
        documentId: 'doc-is-3042',
        sourceId: 'src-bis-portal',
        documentTitle: 'IS 3042:1990 Stainless Steel Pressure Cookers - Specification & QCO Mandatory Requirement',
        content: 'Domestic pressure cookers manufactured from stainless steel must conform strictly to IS 3042:1990. Under the Quality Control Order (QCO) issued by the Ministry of Commerce and Industry, no manufacturer or importer shall sell domestic pressure cookers in India without bearing the Standard Mark (ISI Mark) issued under a valid BIS Licence (CML number). Essential tests include operating pressure test, hydrostatic proof pressure test (minimum 2.5 times operating pressure), and safety valve release pressure verification.',
        section: 'Clause 4 & QCO Compliance',
        tags: ['pressure cooker', 'stainless steel', 'IS 3042', 'cookware', 'kitchen', 'QCO', 'mandatory ISI mark'],
        metadata: { isNumber: 'IS 3042:1990', mandatory: true }
    },
    {
        id: 'chk-3042-02',
        documentId: 'doc-is-3042',
        sourceId: 'src-bis-portal',
        documentTitle: 'IS 3042 Safety Valve and Material Requirements',
        content: 'IS 3042 mandates that stainless steel used for the body and lid of pressure cookers shall be food-grade conforming to IS 5522. Every cooker must feature a fusible safety plug or spring-loaded safety valve that operates reliably between 1.5 to 2.0 times the normal working pressure (1.0 kgf/cm²). The handles must remain thermal insulated and resist flame contact tests.',
        section: 'Clause 6 Safety Features',
        tags: ['pressure cooker', 'safety valve', 'food grade steel', 'IS 3042', 'testing'],
        metadata: { isNumber: 'IS 3042:1990' }
    },
    {
        id: 'chk-10500-01',
        documentId: 'doc-is-10500',
        sourceId: 'src-bis-portal',
        documentTitle: 'IS 10500:2012 Drinking Water Specification & Limits',
        content: 'IS 10500:2012 sets acceptable limits and permissible limits in the absence of an alternate source for drinking water. Acceptable limit for pH is 6.5 to 8.5; Total Dissolved Solids (TDS) acceptable limit is 500 mg/L (permissible up to 2000 mg/L); Total Hardness acceptable limit is 200 mg/L (permissible up to 600 mg/L). E. coli or coliform bacteria must be completely absent in any 100 ml sample tested.',
        section: 'Table 1 Physical and Chemical Parameters',
        tags: ['drinking water', 'IS 10500', 'water quality', 'TDS limit', 'coliform', 'pH limit'],
        metadata: { isNumber: 'IS 10500:2012' }
    },
    {
        id: 'chk-14543-01',
        documentId: 'doc-is-14543',
        sourceId: 'src-bis-portal',
        documentTitle: 'IS 14543 Packaged Drinking Water Mandatory ISI Certification',
        content: 'Packaged Drinking Water (other than natural mineral water) is covered under mandatory BIS Product Certification Scheme I as per FSSAI regulations and BIS QCOs. Processing must include filtration, reverse osmosis / ozonation / UV disinfection. Every bottle must carry the ISI Mark along with CML Licence Number, Batch Number, Date of Packaging, and Expiry Date.',
        section: 'Scope and Mandatory Scheme Requirements',
        tags: ['packaged drinking water', 'IS 14543', 'bottled water', 'ISI mark', 'FSSAI', 'mandatory'],
        metadata: { isNumber: 'IS 14543:2016', mandatory: true }
    },
    {
        id: 'chk-694-01',
        documentId: 'doc-is-694',
        sourceId: 'src-bis-portal',
        documentTitle: 'IS 694 PVC Insulated Cables Mandatory QCO Regulation',
        content: 'Under the Electrical Wires and Cables Quality Control Order, all single-core and multi-core PVC insulated electrical cables up to 1100 V working voltage must bear the ISI Mark as per IS 694:2010. Manufacturers must perform conductor resistance test, insulation resistance test, spark test, and high voltage test on every production batch before dispatch.',
        section: 'Quality Control Order & Mandatory Testing',
        tags: ['pvc cables', 'electrical wire', 'IS 694', 'wiring', 'QCO', 'conductor test'],
        metadata: { isNumber: 'IS 694:2010', mandatory: true }
    },
    {
        id: 'chk-1417-01',
        documentId: 'doc-is-1417',
        sourceId: 'src-hallmarking-portal',
        documentTitle: 'IS 1417 Gold Jewellery Hallmarking & Mandatory HUID System',
        content: 'Mandatory Hallmarking of gold jewellery applies to designated districts in India under IS 1417:2019. Permitted fineness grades are 24K (999 purity), 23K (958), 22K (916), 20K (833), 18K (750), and 14K (585). Every hallmarked gold jewellery item must bear three marks: 1. BIS Logo, 2. Purity/Fineness (e.g., 22K916), and 3. Unique 6-digit alphanumeric Hallmark Unique Identification (HUID) code engraved by a BIS recognized Assaying & Hallmarking Centre.',
        section: 'Clause 4 Fineness & HUID Provisions',
        tags: ['hallmarking', 'gold jewellery', 'IS 1417', 'HUID', '22K916', '18K750', 'bis logo'],
        metadata: { isNumber: 'IS 1417:2019', mandatory: true }
    },
    {
        id: 'chk-15820-01',
        documentId: 'doc-is-15820',
        sourceId: 'src-hallmarking-portal',
        documentTitle: 'IS 15820 Operation of Assaying & Hallmarking Centres (AHC)',
        content: 'Assaying and Hallmarking Centres (AHCs) are independent testing facilities recognized by BIS under IS 15820:2009. AHCs accept gold samples from registered jewellers, perform XRF preliminary testing followed by cupellation fire assay method to verify exact purity, and apply the 6-digit HUID code using high-precision laser marking machines.',
        section: 'Assaying Methodology & Quality Assurance',
        tags: ['assaying centre', 'AHC', 'IS 15820', 'fire assay', 'xrf testing', 'laser marking'],
        metadata: { isNumber: 'IS 15820:2009' }
    },
    {
        id: 'chk-cert-process-01',
        documentId: 'doc-scheme-1',
        sourceId: 'src-manak-online',
        documentTitle: 'BIS Product Certification Scheme I General Application Journey',
        content: 'To obtain a BIS ISI Mark Licence for a product: 1. Register on ManakOnline (manakonline.in) and complete Form I application. 2. Submit test equipment details, factory layout, and manufacturing process flow. 3. Pay prescribed application and inspection fees. 4. BIS inspecting officer visits factory for physical inspection and sample drawing. 5. Samples tested in BIS recognized lab. 6. Upon passing, BIS grants Licence with unique CML number. Licence is valid for 1-2 years and renewable.',
        section: 'Licensing Procedure Guide',
        tags: ['certification steps', 'ISI mark application', 'ManakOnline', 'factory inspection', 'licence fee'],
        metadata: { scheme: 'Scheme-I' }
    },
    {
        id: 'chk-consumer-01',
        documentId: 'doc-consumer-guide',
        sourceId: 'src-bis-portal',
        documentTitle: 'BIS Care App & Consumer Complaint Mechanism',
        content: 'Consumers can verify the authenticity of any ISI Mark CML number or Gold Jewellery HUID code using the official BIS Care mobile app or online portal. If a product bears a fake ISI mark or fails quality standards, consumers can file a formal complaint directly on BIS portal. BIS conducts enforcement raids against illegal misuse of Standard Marks under BIS Act 2016 provisions.',
        section: 'Consumer Rights & Verification',
        tags: ['consumer complaint', 'BIS Care app', 'verify ISI mark', 'fake mark', 'HUID check'],
        metadata: { category: 'Consumer Rights' }
    }
];
