import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { format } from 'date-fns'
import { colors } from "@mui/joy";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const ApplicationPdfView = (appdata) => {
    const { application_id, aapno, app_payment_refno, app_payment_amount, app_name, app_gender,
        nationality, adhar, guardian, guar_relation, father, father_occupation, mother,
        mother_occupation, income, landline, pre_address, com_address, pre_district,
        com_district, pre_state, com_state, pre_pincode, com_pincode, pre_mobile,
        com_mobile, app_email, cour1, cour2, cour3, board, boardname, yearofpass, registerno,
        one_physics, one_ph_max, one_chemistry, one_che_max, one_biology, one_bio_max,
        one_total, one_total_max, two_physics, two_phy_max, physic_per, two_chemoistry,
        two_chem_max, chemistry_per, two_biology, two_bio_max, biology_per, two_mark, two_max_mark,
        two_perc, one_english, one_eng_max, two_english, two_eng_max, english_per, ten_institute,
        ten_board, ten_yearofpass, ten_registerno, ten_attempts, ten_mark, ten_max_mark, ten_perc,
        two_institute, two_board, two_yearofpass, two_registerno, two_attempt,
        dob, religion, cast, paymentDate
    } = appdata

    var doc = {
        background: function (currentPage, pageSize) {
            return {
                table: {
                    widths: [pageSize.width - 70],
                    heights: [pageSize.height - 70],
                    bold: true,
                    body: [['']]
                },
                margin: 30
            };
        },

        pageMargins: [40, 30, 40, 10],
        footer: function (currentPage, pageCount) {
            return {
                margin: 5,
                columns: [
                    {
                        fontSize: 9,
                        text: [
                            {
                                text: currentPage.toString() + ' of ' + pageCount,
                            }
                        ],
                        alignment: 'center'
                    }
                ]
            };
        },
        content: [
            [
                {
                    margin: [0, 0, 5, 0],
                    table: {
                        widths: ['50%', 'auto'],
                        heights: ['auto'],
                        body: [
                            [
                                {
                                    image: 'snow', fit: [150, 150],

                                    margin: [5, 5, 0, 0],

                                },
                            ],

                        ]
                    },
                    layout: 'noBorders', alignment: 'left'
                }
            ],

            [
                {
                    margin: [50, 5, 20, 0],
                    text: 'N. H Bypass Road, Thattamala P O, Kollam - 691020,', bold: true,
                    fontSize: 10, font: 'Roboto', colors: '#f2a516', alignment: 'center'
                },

            ],
            [
                {
                    margin: [30, 3, 0, 0],
                    text: 'Ph:0474 272 1661, +91 9495996174', bold: true,
                    fontSize: 10, font: 'Roboto', colors: '#f2a516', alignment: 'center'
                },

            ],
            [
                {
                    margin: [30, 3, 0, 0],
                    text: 'Web:www.travancoremedicity.com, Email:travancoreparamedical@tmc.ac.in', bold: true,
                    fontSize: 10, font: 'Roboto', colors: '#f2a516', alignment: 'center'
                },

            ],
            [
                {
                    margin: [2, 10, 0, 0],
                    text: 'Details of Application Fee Paid: Online Payment', bold: true,
                    fontSize: 10, font: 'Roboto', colors: '#f2a516',
                },

            ],

            {
                style: 'tableExample',
                table: {
                    widths: [100, 140, 100, 140],
                    body: [
                        [{ text: 'Transaction Ref No', fontSize: 8, font: 'Roboto' },
                        { text: app_payment_refno, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Order Id', fontSize: 8, font: 'Roboto' },
                        { text: aapno, fontSize: 8, bold: true, font: 'Roboto' },
                        ],
                        [{ text: 'Amount', fontSize: 8, font: 'Roboto' },
                        { text: app_payment_amount, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Date', fontSize: 8, font: 'Roboto' },
                        { text: paymentDate, fontSize: 8, bold: true, font: 'Roboto' }
                        ],

                    ]
                }
            },

            [
                {
                    margin: [2, 10, 0, 0],
                    text: ' Personal Details', bold: true,
                    fontSize: 10, font: 'Roboto', colors: '#f2a516'
                },

            ],

            {
                style: 'tableExample',
                table: {
                    widths: [100, 140, 100, 140],
                    body: [
                        [{ text: 'Name of Applicant', fontSize: 8, font: 'Roboto' },
                        { text: app_name, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Gender', fontSize: 8, font: 'Roboto' },
                        { text: app_gender, fontSize: 8, bold: true, font: 'Roboto' },
                        ],
                        [{ text: 'Religion or Community', fontSize: 8, font: 'Roboto' },
                        { text: religion, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Cast', fontSize: 8, font: 'Roboto' },
                        { text: cast, fontSize: 8, bold: true, font: 'Roboto' }
                        ],
                        [{ text: 'Place of Birth', fontSize: 8, font: 'Roboto' },
                        { text: application_id, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Age & Date of Birth', fontSize: 8, font: 'Roboto' },
                        { text: dob, fontSize: 8, bold: true, font: 'Roboto' },
                        ],
                        [{ text: 'Nationality', fontSize: 8, font: 'Roboto' },
                        { text: nationality, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Aadhaar Number', fontSize: 8, font: 'Roboto' },
                        { text: adhar, fontSize: 8, bold: true, font: 'Roboto' }
                        ],

                    ]
                }
            },

            [
                {
                    margin: [2, 10, 0, 2],
                    text: ' Parent / Guardian Details', bold: true,
                    fontSize: 10, font: 'Roboto', colors: '#f2a516'
                },

            ],

            {
                style: 'tableExample',
                table: {
                    widths: [100, 140, 100, 140],
                    body: [
                        [{ text: 'Name of Parent or Guardian', fontSize: 8, font: 'Roboto' },
                        { text: guardian, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Relationship', fontSize: 8, font: 'Roboto' },
                        { text: guar_relation, fontSize: 8, bold: true, font: 'Roboto' },
                        ],
                        [{ text: 'Fathers Name', fontSize: 8, font: 'Roboto' },
                        { text: father, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Fathers Occupation', fontSize: 8, font: 'Roboto' },
                        { text: father_occupation, fontSize: 8, bold: true, font: 'Roboto' }
                        ],
                        [{ text: 'Mothers Name', fontSize: 8, font: 'Roboto' },
                        { text: mother, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Mothers Occupation', fontSize: 8, font: 'Roboto' },
                        { text: mother_occupation, fontSize: 8, bold: true, font: 'Roboto' }
                        ],
                        [{ text: 'Annual Family Income (Rs)', fontSize: 8, font: 'Roboto' },
                        { text: income, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Phone Landline & Code', fontSize: 8, font: 'Roboto' },
                        { text: landline, fontSize: 8, bold: true, font: 'Roboto' }
                        ],

                    ]
                }
            },

            [
                {
                    margin: [2, 10, 0, 3],
                    text: 'Contact Details', bold: true,
                    fontSize: 10, font: 'Roboto', colors: '#f2a516'
                },

            ],

            {
                style: 'tableExample',
                table: {
                    widths: [100, 140, 100, 140],
                    body: [
                        [{ text: 'Permanent Address', fontSize: 8, font: 'Roboto' },
                        { text: pre_address, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Addres of Communication', fontSize: 8, font: 'Roboto' },
                        { text: com_address, fontSize: 8, bold: true, font: 'Roboto' },
                        ],
                        [{ text: 'District', fontSize: 8, font: 'Roboto' },
                        { text: pre_district, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'District', fontSize: 8, font: 'Roboto' },
                        { text: com_district, fontSize: 8, bold: true, font: 'Roboto' }
                        ],
                        [{ text: 'State', fontSize: 8, font: 'Roboto' },
                        { text: pre_state, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'State', fontSize: 8, font: 'Roboto' },
                        { text: com_state, fontSize: 8, bold: true, font: 'Roboto' }
                        ],
                        [{ text: 'PIN Code', fontSize: 8, font: 'Roboto' },
                        { text: pre_pincode, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'PIN Code', fontSize: 8, font: 'Roboto' },
                        { text: com_pincode, fontSize: 8, bold: true, font: 'Roboto' }
                        ],
                        [{ text: 'Mobile Number', fontSize: 8, font: 'Roboto' },
                        { text: pre_mobile, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Mobile Number 2', fontSize: 8, font: 'Roboto' },
                        { text: com_mobile, fontSize: 8, bold: true, font: 'Roboto' }
                        ],
                        [{ text: 'E-mail', fontSize: 8, font: 'Roboto' },
                        { text: app_email, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Date', fontSize: 8, font: 'Roboto' },
                        { text: application_id, fontSize: 8, bold: true, font: 'Roboto' }
                        ],
                    ]
                }
            },
            [
                {
                    margin: [2, 10, 0, 3],
                    text: 'Course Preference', bold: true,
                    fontSize: 10, font: 'Roboto', colors: '#f2a516'
                },

            ],

            {
                style: 'tableExample',
                table: {
                    widths: [50, 447],
                    body: [
                        [{ text: 'Preference', fontSize: 8, font: 'Roboto' },
                        { text: 'Course', fontSize: 9, bold: true, font: 'Roboto' },

                        ],
                        [{ text: '1', fontSize: 8, font: 'Roboto' },
                        { text: cour1, fontSize: 9, bold: true, font: 'Roboto' },

                        ],
                        [{ text: '2', fontSize: 8, font: 'Roboto' },
                        { text: cour2, fontSize: 9, bold: true, font: 'Roboto' },

                        ],
                        [{ text: '3', fontSize: 8, font: 'Roboto' },
                        { text: cour3, fontSize: 9, bold: true, font: 'Roboto' },

                        ],

                    ]
                }
            },

            [
                {
                    margin: [2, 10, 0, 3],
                    text: 'Detail of Qualifying Examination', bold: true,
                    fontSize: 10, font: 'Roboto', colors: '#f2a516'
                },
            ],

            {
                style: 'tableExample',
                table: {
                    widths: [50, 150, 110, 167],
                    body: [
                        [{ text: 'Board', fontSize: 8, font: 'Roboto' },
                        { text: 'Name of Board', fontSize: 9, bold: true, font: 'Roboto' },
                        { text: 'Year of Passing', fontSize: 8, font: 'Roboto' },
                        { text: 'Register Number', fontSize: 8, bold: true, font: 'Roboto' },
                        ],
                        [{ text: board, fontSize: 8, font: 'Roboto' },
                        { text: boardname, fontSize: 9, bold: true, font: 'Roboto' },
                        { text: yearofpass, fontSize: 8, font: 'Roboto' },
                        { text: registerno, fontSize: 8, bold: true, font: 'Roboto' }
                        ],
                    ]
                }
            },

            [
                {
                    margin: [2, 10, 0, 3],
                    text: 'Mark Obtained in Qualifying Examination', bold: true,
                    fontSize: 10, font: 'Roboto', colors: '#f2a516'
                },
            ],


            {
                table: {
                    widths: [130, 170, 190],
                    heights: ['auto'],
                    body: [
                        [
                            {
                                margin: [0, 0, 3, 0],
                                style: 'tableExample',
                                table: {
                                    widths: [129],
                                    body: [
                                        [{
                                            text: 'Subject',
                                            alignment: 'center', fontSize: 8, font: 'Roboto',
                                        },


                                        ],
                                        [{ text: '.', fontSize: 9, font: 'Roboto' },

                                        ],
                                        [{ text: 'i) Physics', fontSize: 9, font: 'Roboto' },

                                        ],
                                        [{ text: 'ii) Chemistry', fontSize: 9, bold: true, font: 'Roboto' },

                                        ],
                                        [{ text: 'iii) Biology or Equivalent', fontSize: 9, bold: true, font: 'Roboto' },

                                        ],
                                        [{ text: 'Total sum of (i),(ii),(iii)', fontSize: 9, bold: true, font: 'Roboto' },

                                        ],
                                        [{ text: 'iv) English', fontSize: 9, bold: true, font: 'Roboto' },

                                        ],
                                    ]
                                }
                            },

                            {
                                style: 'tableExample',
                                table: {
                                    widths: [80, 80],
                                    body: [
                                        [{
                                            text: 'Plus One',
                                            alignment: 'center', colSpan: 2, fontSize: 8, font: 'Roboto',
                                        },
                                        {},

                                        ],
                                        [{ text: 'Marks Obtained', fontSize: 8, bold: true, font: 'Roboto' },
                                        { text: 'Max. Marks', fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: one_physics, fontSize: 8, bold: true, font: 'Roboto' },
                                        { text: one_ph_max, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: one_chemistry, fontSize: 8, bold: true, font: 'Roboto' },
                                        { text: one_che_max, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: one_biology, fontSize: 8, bold: true, font: 'Roboto' },
                                        { text: one_bio_max, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: one_total, fontSize: 8, bold: true, font: 'Roboto' },
                                        { text: one_total_max, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: one_english, fontSize: 8, bold: true, font: 'Roboto' },
                                        { text: one_eng_max, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                    ]
                                }
                            },
                            {
                                style: 'tableExample',
                                table: {
                                    widths: [60, 60, 50],
                                    body: [
                                        [{
                                            text: 'Plus Two',
                                            alignment: 'center', colSpan: 3, fontSize: 8, font: 'Roboto',

                                        },
                                        {},
                                        {},
                                        ],
                                        [{ text: 'Marks Obtained', fontSize: 8, bold: true, font: 'Roboto' },
                                        { text: 'Max. Marks', fontSize: 9, bold: true, font: 'Roboto' },
                                        { text: '% of Marks', fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: two_physics, fontSize: 8, bold: true, font: 'Roboto' },
                                        { text: two_phy_max, fontSize: 9, bold: true, font: 'Roboto' },
                                        { text: physic_per, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: two_chemoistry, fontSize: 8, bold: true, font: 'Roboto' },
                                        { text: two_chem_max, fontSize: 9, bold: true, font: 'Roboto' },
                                        { text: chemistry_per, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: two_biology, fontSize: 8, bold: true, font: 'Roboto' },
                                        { text: two_bio_max, fontSize: 9, bold: true, font: 'Roboto' },
                                        { text: biology_per, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: two_mark, fontSize: 8, bold: true, font: 'Roboto' },
                                        { text: two_max_mark, fontSize: 9, bold: true, font: 'Roboto' },
                                        { text: two_perc, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: two_english, fontSize: 8, bold: true, font: 'Roboto' },
                                        { text: two_eng_max, fontSize: 9, bold: true, font: 'Roboto' },
                                        { text: english_per, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                    ]
                                }
                            },
                        ],
                    ]
                },
                layout: 'noBorders'
            },

            [
                {
                    margin: [5, 100, 5, 0],
                    text: 'Details of 10th & 12th Standard Examination', bold: true,
                    fontSize: 10, font: 'Roboto', colors: '#f2a516'
                },

            ],
            {
                table: {
                    widths: [250, 250],
                    heights: ['auto'],
                    body: [
                        [


                            {
                                style: 'tableExample',
                                table: {
                                    widths: [115, 115],
                                    body: [
                                        [{ text: 'Details of 10th & 12th Standard Examination', alignment: 'center', colSpan: 2, fontSize: 8, font: 'Roboto', },
                                        {}],
                                        [{ text: 'Name of Institution', fontSize: 8, font: 'Roboto' },
                                        { text: ten_institute, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: 'Name of Examination / Board', fontSize: 8, font: 'Roboto' },
                                        { text: ten_board, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: 'Year of Passing', fontSize: 8, font: 'Roboto' },
                                        { text: ten_yearofpass, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: 'Register Number', fontSize: 8, font: 'Roboto' },
                                        { text: ten_registerno, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: 'Number of Attemots', fontSize: 8, font: 'Roboto' },
                                        { text: ten_attempts, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: 'Mark Obtained', fontSize: 8, font: 'Roboto' },
                                        { text: ten_mark, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: 'Max.Marks', fontSize: 8, font: 'Roboto' },
                                        { text: ten_max_mark, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: '% Marks', fontSize: 8, font: 'Roboto' },
                                        { text: ten_perc, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                    ]
                                }
                            },
                            {
                                style: 'tableExample',
                                table: {
                                    widths: [115, 120],
                                    body: [
                                        [{ text: 'Details of 10th & 12th Standard Examination', alignment: 'center', colSpan: 2, fontSize: 8, font: 'Roboto', },
                                        {}],
                                        [{ text: 'Name of Institution', fontSize: 8, font: 'Roboto' },
                                        { text: two_institute, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: 'Name of Examination / Board', fontSize: 8, font: 'Roboto' },
                                        { text: two_board, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: 'Year of Passing', fontSize: 8, font: 'Roboto' },
                                        { text: two_yearofpass, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: 'Register Number', fontSize: 8, font: 'Roboto' },
                                        { text: two_registerno, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: 'Number of Attemots', fontSize: 8, font: 'Roboto' },
                                        { text: two_attempt, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: 'Mark Obtained', fontSize: 8, font: 'Roboto' },
                                        { text: ten_mark, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: 'Max.Marks', fontSize: 8, font: 'Roboto' },
                                        { text: two_max_mark, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                        [{ text: '% Marks', fontSize: 8, font: 'Roboto' },
                                        { text: two_perc, fontSize: 9, bold: true, font: 'Roboto' },
                                        ],
                                    ]
                                }
                            },
                        ],
                    ]
                },
                layout: 'noBorders'
            },
            [
                {
                    margin: [2, 10, 0, 3],
                    text: 'Joint Declaration by the Applicant & Parent / Guardian', bold: true,
                    fontSize: 10, font: 'Roboto', colors: '#f2a516'
                },

            ],
            [
                {
                    margin: [6, 10, 0, 3],
                    text: 'I do hereby declare that all the information furnished above are true and correct and we will obey the rules and regulations of the institution, if admitted. We promise to submit all certificates and documents in orginal at the time of admission failingwhich the admission will be liable for cancellation',
                    bold: true,
                    fontSize: 8, font: 'Roboto', colors: '#f2a516'
                },

            ],
        ],
        images: {
            // snow: 'https://collegeofalliedhealth.travancoremedicity.com/wp-content/uploads/2024/05/CAHS-LOGO-300x135.png'
            snow: 'http://192.168.22.170/NAS/logo/colleagelogo.png',

        }

    }


















    pdfMake.createPdf(doc).open();
}