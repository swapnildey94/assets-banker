const ageInYears = [
    {text: '1-5 Years', value: '1-5 Years'},
    {text: '6-10 Years', value: '6-10 Years'},
    {text: '10-20 Years', value: '10-20 years'},
    {text: 'Over 20 Years', value: 'Over 20 years'},
    {text: 'Other', value: 'Other'}
]

const workingCondition = [
    {text: 'Yes', value: 'Yes'},
    {text: 'No', value: 'No'},
    {text: 'I Don\'t Know', value: 'I do not know'}
]

const generalCondition = [
    {text: 'Pristine – like new condition', value: 'Pristine – like new condition'},
    {text: 'Excellent – Very well kept with a minor hard to find imperfections', value: 'Excellent – Very well kept with a minor hard to find imperfections'},
    {text: 'Very Good – Well-kept with noticeable yet negligible imperfections', value: 'Very Good – Well-kept with noticeable yet negligible imperfections'},
    {text: 'Good-well used with noticeable wear and tear imperfection', value: 'Good-well used with noticeable wear and tear imperfection'},
    {text: 'Poor- Mechanical problems, poor cosmetic appearance', value: 'Poor- Mechanical problems, poor cosmetic appearance'},
]

export const AssetInfo = [
    {
        src: 'data:image/webp;base64,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',
        thumbnail: 'data:image/webp;base64,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',
        thumbnailWidth: 162,
        thumbnailHeight: 116,
        name: 'Gold',
        ageInYears: ageInYears,
        workingCondition: workingCondition,
        generalCondition: generalCondition,
        types: [
            {text: 'Band', value: 'Band'},
            {text: 'Bangle', value: 'Bangle'},
            {text: 'Bracelet', value: 'Bracelet'},
            {text: 'Brooch', value: 'Brooch'},
            {text: 'Buckle', value: 'Buckle'},
            {text: 'Clasp', value: 'Clasp'},
            {text: 'Cuff Links', value: 'Cuff Links'},
            {text: 'Earrings', value: 'Earrings'},
            {text: 'Medal/Medallion', value: 'Medal/Medallion'},
            {text: 'Necklace', value: 'Necklace'},
            {text: 'Pendant', value: 'Pendant'},
            {text: 'Pin', value: 'Pin'},
            {text: 'Ring', value: 'Ring'},
            {text: 'Studs', value: 'Studs'},
            {text: 'Tiara', value: 'Tiara'}]
    },
    {
        src: 'http://luxebanker.com/wp-content/uploads/2018/07/300x200xdiamond-315560_960_720-300x200.jpg.pagespeed.ic.FM_IHQdK9P.webp',
        thumbnail: 'http://luxebanker.com/wp-content/uploads/2018/07/300x200xdiamond-315560_960_720-300x200.jpg.pagespeed.ic.FM_IHQdK9P.webp',
        thumbnailWidth: 162,
        thumbnailHeight: 116,
        name: 'Diamond',
        ageInYears: ageInYears,
        workingCondition: workingCondition,
        generalCondition: generalCondition,
        types: [
            {text: 'Round', value: 'Round'},
            {text: 'Princess', value: 'Princess'},
            {text: 'Emerald', value: 'Emerald'},
            {text: 'Marquise', value: 'Marquise'},
            {text: 'Oval', value: 'Oval'},
            {text: 'Pear', value: 'Pear'},
            {text: 'Heart', value: 'Heart'},
            {text: 'Radiant', value: 'Radiant'},
            {text: 'Cushion', value: 'Cushion'},
            {text: 'Asscher', value: 'Asscher'}],
        mounting: [
            {text: 'Loose (not set)', value: 'Loose (not set)'},
            {text: 'Mounted in a Ring', value: 'Mounted in a Ring'},
            {text: 'Mounted in a Pendant', value: 'Mounted in a Pendant'},
            {text: 'Set in Earrings', value: 'Set in Earrings'},
            {text: 'Set in a Bracelet', value: 'Set in a Bracelet'},
            {text: 'Set in a Necklace', value: 'Set in a Necklace'},
        ],
        color: [
            {text: 'Colorless', value: 'Colorless'},
            {text: 'Near Colorless', value: 'Near Colorless'},
            {text: 'Faint Yellow', value: 'Faint Yellow'},
            {text: 'Yellow', value: 'Yellow'},
        ]
    },
    {
        src: 'http://luxebanker.com/wp-content/uploads/2018/07/300x200xwatch-1744773_960_720-300x200.jpg.pagespeed.ic.P7v9k93cR7.webp',
        thumbnail: 'http://luxebanker.com/wp-content/uploads/2018/07/300x200xwatch-1744773_960_720-300x200.jpg.pagespeed.ic.P7v9k93cR7.webp',
        thumbnailWidth: 162,
        thumbnailHeight: 116,
        name: 'Watches',
        ageInYears: ageInYears,
        workingCondition: workingCondition,
        generalCondition: generalCondition,
        types: [
            {text: 'Beaded', value: 'Beaded'},
            {text: 'Box', value: 'Box'},
            {text: 'Byzanthium', value: 'Byzanthium'},
            {text: 'Cable', value: 'Cable'},
            {text: 'Curb', value: 'Curb'},
            {text: 'Expansion', value: 'Expansion'},
            {text: 'Figaro', value: 'Figaro'},
            {text: 'Herringbone', value: 'Herringbone'},
            {text: 'Mesh', value: 'Mesh'},
            {text: 'Neckchain', value: 'Neckchain'},
            {text: 'Oyster', value: 'Oyster'},
            {text: 'President', value: 'President'},
            {text: 'Singapore', value: 'Singapore'},
            {text: 'Snake', value: 'Snake'},
            {text: 'Unsure', value: 'Unsure'},
            {text: 'Other', value: 'Other'}],
        material: [
            {text: 'Leather Strap', value: 'Leather Strap'},
            {text: 'Rubber Strap', value: 'Rubber Strap'},
            {text: 'Synthetic Strap', value: 'Synthetic Strap'},
            {text: 'Stainless Steel Bracelet', value: 'Stainless Steel Bracelet'},
            {text: 'Titanium Bracelet', value: 'Titanium Bracelet'},
            {text: 'Two-Tone Bracelet', value: 'Two-Tone Bracelet'},
            {text: 'White Gold Bracelet', value: 'White Gold Bracelet'},
            {text: 'Yellow Gold Bracelet', value: 'Yellow Gold Bracelet'},
            {text: 'I Don\'t Know', value: 'I do not know'}
        ],
        originalStrap: workingCondition
    },
    {
        src: 'http://luxebanker.com/wp-content/uploads/2018/07/300x200xjewelry-1744773_960_720-300x200.jpg.pagespeed.ic.7H5MhezH33.webp',
        thumbnail: 'http://luxebanker.com/wp-content/uploads/2018/07/300x200xjewelry-1744773_960_720-300x200.jpg.pagespeed.ic.7H5MhezH33.webp',
        thumbnailWidth: 162,
        thumbnailHeight: 116,
        name: 'Silver',
        ageInYears: ageInYears,
        workingCondition: workingCondition,
        generalCondition: generalCondition,
        types: [
            {text: 'Band', value: 'Band'},
            {text: 'Bangle', value: 'Bangle'},
            {text: 'Bracelet', value: 'Bracelet'},
            {text: 'Brooch', value: 'Brooch'},
            {text: 'Buckle', value: 'Buckle'},
            {text: 'Clasp', value: 'Clasp'},
            {text: 'Cuff Links', value: 'Cuff Links'},
            {text: 'Earrings', value: 'Earrings'},
            {text: 'Medal/Medallion', value: 'Medal/Medallion'},
            {text: 'Necklace', value: 'Necklace'},
            {text: 'Pendant', value: 'Pendant'},
            {text: 'Pin', value: 'Pin'},
            {text: 'Ring', value: 'Ring'},
            {text: 'Studs', value: 'Studs'},
            {text: 'Tiara', value: 'Tiara'}]
    }, {
        src: 'http://www.other-themovie.com/other_logo_03.png',
        thumbnail: 'http://www.other-themovie.com/other_logo_03.png',
        thumbnailWidth: 162,
        thumbnailHeight: 116,
        name: 'Asset',
        ageInYears: ageInYears,
        workingCondition: workingCondition,
        generalCondition: generalCondition,
        types: [
            {text: 'Car', value: 'Car'},
            {text: 'Artwork', value: 'Artwork'},
            {text: 'Wine', value: 'Wine'},
            {text: 'Other', value: 'Other'}]
    }
];