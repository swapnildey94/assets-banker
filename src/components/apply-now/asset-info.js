import gold from '../../images/gold.jpg';
import diamond from '../../images/diamond.jpg';
import jewelry from '../../images/jewelry.jpg';
import watch from '../../images/watch.jpg';
import other from '../../images/other-luxury.jpg';

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
        src: gold,
        thumbnail: gold,
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
        src: diamond,
        thumbnail: diamond,
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
        src: watch,
        thumbnail: watch,
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
        src: jewelry,
        thumbnail: jewelry,
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
        src: other,
        thumbnail: other,
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