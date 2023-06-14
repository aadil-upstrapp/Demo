import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  FlatList,
  SafeAreaView,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import { wp } from './constants';
import Colors from './constants/Colors';
import Fonts from './constants/Fonts';
import ResponsivePixels from './constants/ResponsivePixels';
const CountryList = [
  {
    Currency: 'AD',
    Name: 'Andorra',
    Code: '+376',
    // Image: require('../assets/CountryFlag/flag_ad.png'),
    Image: require('../assets/CountryFlag/flag_ad.png'),
  },
  {
    Currency: 'AE',
    Name: 'United Arab Emirates',
    Code: '+971',
    Image: require('../assets/CountryFlag/flag_ae.png'),
  },
  {
    Currency: 'AF',
    Name: 'Afghanistan',
    Code: '+93',
    Image: require('../assets/CountryFlag/flag_af.png'),
  },
  {
    Currency: 'AG',
    Name: 'Antigua and Barbuda',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_ag.png'),
  },
  {
    Currency: 'AI',
    Name: 'Anguilla',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_ai.png'),
  },
  {
    Currency: 'AL',
    Name: 'Albania',
    Code: '+355',
    Image: require('../assets/CountryFlag/flag_al.png'),
  },
  {
    Currency: 'AM',
    Name: 'Armenia',
    Code: '+374',
    Image: require('../assets/CountryFlag/flag_am.png'),
  },
  {
    Currency: 'AO',
    Name: 'Angola',
    Code: '+244',
    Image: require('../assets/CountryFlag/flag_ao.png'),
  },
  {
    Currency: 'AQ',
    Name: 'Antarctica',
    Code: '+672',
    Image: require('../assets/CountryFlag/flag_aq.png'),
  },
  {
    Currency: 'AR',
    Name: 'Argentina',
    Code: '+54',
    Image: require('../assets/CountryFlag/flag_ar.png'),
  },
  {
    Currency: 'AS',
    Name: 'AmericanSamoa',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_as.png'),
  },
  {
    Currency: 'AT',
    Name: 'Austria',
    Code: '+43',
    Image: require('../assets/CountryFlag/flag_at.png'),
  },
  {
    Currency: 'AU',
    Name: 'Australia',
    Code: '+61',
    Image: require('../assets/CountryFlag/flag_au.png'),
  },
  {
    Currency: 'AW',
    Name: 'Aruba',
    Code: '+297',
    Image: require('../assets/CountryFlag/flag_aw.png'),
  },
  {
    Currency: 'AX',
    Name: 'Åland Islands',
    Code: '+358',
    Image: require('../assets/CountryFlag/flag_ax.png'),
  },
  {
    Currency: 'AZ',
    Name: 'Azerbaijan',
    Code: '+994',
    Image: require('../assets/CountryFlag/flag_az.png'),
  },
  {
    Currency: 'BA',
    Name: 'Bosnia and Herzegovina',
    Code: '+387',
    Image: require('../assets/CountryFlag/flag_ba.png'),
  },
  {
    Currency: 'BB',
    Name: 'Barbados',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_bb.png'),
  },
  {
    Currency: 'BD',
    Name: 'Bangladesh',
    Code: '+880',
    Image: require('../assets/CountryFlag/flag_bd.png'),
  },
  {
    Currency: 'BE',
    Name: 'Belgium',
    Code: '+32',
    Image: require('../assets/CountryFlag/flag_be.png'),
  },
  {
    Currency: 'BF',
    Name: 'Burkina Faso',
    Code: '+226',
    Image: require('../assets/CountryFlag/flag_bf.png'),
  },
  {
    Currency: 'BG',
    Name: 'Bulgaria',
    Code: '+359',
    Image: require('../assets/CountryFlag/flag_bg.png'),
  },
  {
    Currency: 'BH',
    Name: 'Bahrain',
    Code: '+973',
    Image: require('../assets/CountryFlag/flag_bh.png'),
  },
  {
    Currency: 'BI',
    Name: 'Burundi',
    Code: '+257',
    Image: require('../assets/CountryFlag/flag_bi.png'),
  },
  {
    Currency: 'BJ',
    Name: 'Benin',
    Code: '+229',
    Image: require('../assets/CountryFlag/flag_bj.png'),
  },
  {
    Currency: 'BL',
    Name: 'Saint Barthélemy',
    Code: '+590',
    Image: require('../assets/CountryFlag/flag_bl.png'),
  },
  {
    Currency: 'BM',
    Name: 'Bermuda',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_bm.png'),
  },
  {
    Currency: 'BN',
    Name: 'Brunei Darussalam',
    Code: '+673',
    Image: require('../assets/CountryFlag/flag_bn.png'),
  },
  {
    Currency: 'BO',
    Name: 'Bolivia, Plurinational State of',
    Code: '+591',
    Image: require('../assets/CountryFlag/flag_bo.png'),
  },
  {
    Currency: 'BQ',
    Name: 'Bonaire',
    Code: '+599',
    Image: require('../assets/CountryFlag/flag_bq.png'),
  },
  {
    Currency: 'BR',
    Name: 'Brazil',
    Code: '+55',
    Image: require('../assets/CountryFlag/flag_br.png'),
  },
  {
    Currency: 'BS',
    Name: 'Bahamas',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_bs.png'),
  },
  {
    Currency: 'BT',
    Name: 'Bhutan',
    Code: '+975',
    Image: require('../assets/CountryFlag/flag_bt.png'),
  },
  {
    Currency: 'BV',
    Name: 'Bouvet Island',
    Code: '+47',
    Image: require('../assets/CountryFlag/flag_bv.png'),
  },
  {
    Currency: 'BW',
    Name: 'Botswana',
    Code: '+267',
    Image: require('../assets/CountryFlag/flag_bw.png'),
  },
  {
    Currency: 'BY',
    Name: 'Belarus',
    Code: '+375',
    Image: require('../assets/CountryFlag/flag_by.png'),
  },
  {
    Currency: 'BZ',
    Name: 'Belize',
    Code: '+501',
    Image: require('../assets/CountryFlag/flag_bz.png'),
  },
  {
    Currency: 'CA',
    Name: 'Canada',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_ca.png'),
  },
  {
    Currency: 'CC',
    Name: 'Cocos (Keeling) Islands',
    Code: '+61',
    Image: require('../assets/CountryFlag/flag_cc.png'),
  },
  {
    Currency: 'CD',
    Name: 'Congo, The Democratic Republic of the',
    Code: '+243',
    Image: require('../assets/CountryFlag/flag_cd.png'),
  },
  {
    Currency: 'CF',
    Name: 'Central African Republic',
    Code: '+236',
    Image: require('../assets/CountryFlag/flag_cf.png'),
  },
  {
    Currency: 'CG',
    Name: 'Congo',
    Code: '+242',
    Image: require('../assets/CountryFlag/flag_cg.png'),
  },
  {
    Currency: 'CH',
    Name: 'Switzerland',
    Code: '+41',
    Image: require('../assets/CountryFlag/flag_ch.png'),
  },
  {
    Currency: 'CI',
    Name: 'Ivory Coast',
    Code: '+225',
    Image: require('../assets/CountryFlag/flag_ci.png'),
  },
  {
    Currency: 'CK',
    Name: 'Cook Islands',
    Code: '+682',
    Image: require('../assets/CountryFlag/flag_ck.png'),
  },
  {
    Currency: 'CL',
    Name: 'Chile',
    Code: '+56',
    Image: require('../assets/CountryFlag/flag_cl.png'),
  },
  {
    Currency: 'CM',
    Name: 'Cameroon',
    Code: '+237',
    Image: require('../assets/CountryFlag/flag_cm.png'),
  },
  {
    Currency: 'CN',
    Name: 'China',
    Code: '+86',
    Image: require('../assets/CountryFlag/flag_cn.png'),
  },
  {
    Currency: 'CO',
    Name: 'Colombia',
    Code: '+57',
    Image: require('../assets/CountryFlag/flag_co.png'),
  },
  {
    Currency: 'CR',
    Name: 'Costa Rica',
    Code: '+506',
    Image: require('../assets/CountryFlag/flag_cr.png'),
  },
  {
    Currency: 'CU',
    Name: 'Cuba',
    Code: '+53',
    Image: require('../assets/CountryFlag/flag_cu.png'),
  },
  {
    Currency: 'CV',
    Name: 'Cape Verde',
    Code: '+238',
    Image: require('../assets/CountryFlag/flag_cv.png'),
  },
  {
    Currency: 'CW',
    Name: 'Curacao',
    Code: '+599',
    Image: require('../assets/CountryFlag/flag_cw.png'),
  },
  {
    Currency: 'CX',
    Name: 'Christmas Island',
    Code: '+61',
    Image: require('../assets/CountryFlag/flag_cx.png'),
  },
  {
    Currency: 'CY',
    Name: 'Cyprus',
    Code: '+357',
    Image: require('../assets/CountryFlag/flag_cy.png'),
  },
  {
    Currency: 'CZ',
    Name: 'Czech Republic',
    Code: '+420',
    Image: require('../assets/CountryFlag/flag_cz.png'),
  },
  {
    Currency: 'DE',
    Name: 'Germany',
    Code: '+49',
    Image: require('../assets/CountryFlag/flag_de.png'),
  },
  {
    Currency: 'DJ',
    Name: 'Djibouti',
    Code: '+253',
    Image: require('../assets/CountryFlag/flag_dj.png'),
  },
  {
    Currency: 'DK',
    Name: 'Denmark',
    Code: '+45',
    Image: require('../assets/CountryFlag/flag_dk.png'),
  },
  {
    Currency: 'DM',
    Name: 'Dominica',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_dm.png'),
  },
  {
    Currency: 'DO',
    Name: 'Dominican Republic',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_do.png'),
  },
  {
    Currency: 'DZ',
    Name: 'Algeria',
    Code: '+213',
    Image: require('../assets/CountryFlag/flag_dz.png'),
  },
  {
    Currency: 'EC',
    Name: 'Ecuador',
    Code: '+593',
    Image: require('../assets/CountryFlag/flag_ec.png'),
  },
  {
    Currency: 'EE',
    Name: 'Estonia',
    Code: '+372',
    Image: require('../assets/CountryFlag/flag_ee.png'),
  },
  {
    Currency: 'EG',
    Name: 'Egypt',
    Code: '+20',
    Image: require('../assets/CountryFlag/flag_eg.png'),
  },
  {
    Currency: 'EH',
    Name: 'Western Sahara',
    Code: '+212',
    Image: require('../assets/CountryFlag/flag_eh.png'),
  },
  {
    Currency: 'ER',
    Name: 'Eritrea',
    Code: '+291',
    Image: require('../assets/CountryFlag/flag_er.png'),
  },
  {
    Currency: 'ES',
    Name: 'Spain',
    Code: '+34',
    Image: require('../assets/CountryFlag/flag_es.png'),
  },
  {
    Currency: 'ET',
    Name: 'Ethiopia',
    Code: '+251',
    Image: require('../assets/CountryFlag/flag_et.png'),
  },
  {
    Currency: 'FI',
    Name: 'Finland',
    Code: '+358',
    Image: require('../assets/CountryFlag/flag_fi.png'),
  },
  {
    Currency: 'FJ',
    Name: 'Fiji',
    Code: '+679',
    Image: require('../assets/CountryFlag/flag_fj.png'),
  },
  {
    Currency: 'FK',
    Name: 'Falkland Islands (Malvinas)',
    Code: '+500',
    Image: require('../assets/CountryFlag/flag_fk.png'),
  },
  {
    Currency: 'FM',
    Name: 'Micronesia, Federated States of',
    Code: '+691',
    Image: require('../assets/CountryFlag/flag_fm.png'),
  },
  {
    Currency: 'FO',
    Name: 'Faroe Islands',
    Code: '+298',
    Image: require('../assets/CountryFlag/flag_fo.png'),
  },
  {
    Currency: 'FR',
    Name: 'France',
    Code: '+33',
    Image: require('../assets/CountryFlag/flag_fr.png'),
  },
  {
    Currency: 'GA',
    Name: 'Gabon',
    Code: '+241',
    Image: require('../assets/CountryFlag/flag_ga.png'),
  },
  {
    Currency: 'GB',
    Name: 'United Kingdom',
    Code: '+44',
    Image: require('../assets/CountryFlag/flag_gb.png'),
  },
  {
    Currency: 'GD',
    Name: 'Grenada',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_gd.png'),
  },
  {
    Currency: 'GE',
    Name: 'Georgia',
    Code: '+995',
    Image: require('../assets/CountryFlag/flag_ge.png'),
  },
  {
    Currency: 'GF',
    Name: 'French Guiana',
    Code: '+594',
    Image: require('../assets/CountryFlag/flag_gf.png'),
  },
  {
    Currency: 'GG',
    Name: 'Guernsey',
    Code: '+44',
    Image: require('../assets/CountryFlag/flag_gg.png'),
  },
  {
    Currency: 'GH',
    Name: 'Ghana',
    Code: '+233',
    Image: require('../assets/CountryFlag/flag_gh.png'),
  },
  {
    Currency: 'GI',
    Name: 'Gibraltar',
    Code: '+350',
    Image: require('../assets/CountryFlag/flag_gi.png'),
  },
  {
    Currency: 'GL',
    Name: 'Greenland',
    Code: '+299',
    Image: require('../assets/CountryFlag/flag_gl.png'),
  },
  {
    Currency: 'GM',
    Name: 'Gambia',
    Code: '+220',
    Image: require('../assets/CountryFlag/flag_gm.png'),
  },
  {
    Currency: 'GN',
    Name: 'Guinea',
    Code: '+224',
    Image: require('../assets/CountryFlag/flag_gn.png'),
  },
  {
    Currency: 'GP',
    Name: 'Guadeloupe',
    Code: '+590',
    Image: require('../assets/CountryFlag/flag_gp.png'),
  },
  {
    Currency: 'GQ',
    Name: 'Equatorial Guinea',
    Code: '+240',
    Image: require('../assets/CountryFlag/flag_gq.png'),
  },
  {
    Currency: 'GR',
    Name: 'Greece',
    Code: '+30',
    Image: require('../assets/CountryFlag/flag_gr.png'),
  },
  {
    Currency: 'GS',
    Name: 'South Georgia and the South Sandwich Islands',
    Code: '+500',
    Image: require('../assets/CountryFlag/flag_gs.png'),
  },
  {
    Currency: 'GT',
    Name: 'Guatemala',
    Code: '+502',
    Image: require('../assets/CountryFlag/flag_gt.png'),
  },
  {
    Currency: 'GU',
    Name: 'Guam',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_gu.png'),
  },
  {
    Currency: 'GW',
    Name: 'Guinea-Bissau',
    Code: '+245',
    Image: require('../assets/CountryFlag/flag_gw.png'),
  },
  {
    Currency: 'GY',
    Name: 'Guyana',
    Code: '+595',
    Image: require('../assets/CountryFlag/flag_gy.png'),
  },
  {
    Currency: 'HK',
    Name: 'Hong Kong',
    Code: '+852',
    Image: require('../assets/CountryFlag/flag_hk.png'),
  },
  {
    Currency: 'HN',
    Name: 'Honduras',
    Code: '+504',
    Image: require('../assets/CountryFlag/flag_hn.png'),
  },
  {
    Currency: 'HR',
    Name: 'Croatia',
    Code: '+385',
    Image: require('../assets/CountryFlag/flag_hr.png'),
  },
  {
    Currency: 'HT',
    Name: 'Haiti',
    Code: '+509',
    Image: require('../assets/CountryFlag/flag_ht.png'),
  },
  {
    Currency: 'HU',
    Name: 'Hungary',
    Code: '+36',
    Image: require('../assets/CountryFlag/flag_hu.png'),
  },
  {
    Currency: 'ID',
    Name: 'Indonesia',
    Code: '+62',
    Image: require('../assets/CountryFlag/flag_id.png'),
  },
  {
    Currency: 'IE',
    Name: 'Ireland',
    Code: '+353',
    Image: require('../assets/CountryFlag/flag_ie.png'),
  },
  {
    Currency: 'IL',
    Name: 'Israel',
    Code: '+972',
    Image: require('../assets/CountryFlag/flag_il.png'),
  },
  {
    Currency: 'IM',
    Name: 'Isle of Man',
    Code: '+44',
    Image: require('../assets/CountryFlag/flag_im.png'),
  },
  {
    Currency: 'IN',
    Name: 'India',
    Code: '+91',
    Image: require('../assets/CountryFlag/flag_in.png'),
  },
  {
    Currency: 'IO',
    Name: 'British Indian Ocean Territory',
    Code: '+246',
    Image: require('../assets/CountryFlag/flag_io.png'),
  },
  {
    Currency: 'IQ',
    Name: 'Iraq',
    Code: '+964',
    Image: require('../assets/CountryFlag/flag_iq.png'),
  },
  {
    Currency: 'IR',
    Name: 'Iran,Islamic Republic of',
    Code: '+98',
    Image: require('../assets/CountryFlag/flag_ir.png'),
  },
  {
    Currency: 'IS',
    Name: 'Iceland',
    Code: '+354',
    Image: require('../assets/CountryFlag/flag_is.png'),
  },
  {
    Currency: 'IT',
    Name: 'Italy',
    Code: '+39',
    Image: require('../assets/CountryFlag/flag_it.png'),
  },
  {
    Currency: 'JE',
    Name: 'Jersey',
    Code: '+44',
    Image: require('../assets/CountryFlag/flag_je.png'),
  },
  {
    Currency: 'JM',
    Name: 'Jamaica',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_jm.png'),
  },
  {
    Currency: 'JO',
    Name: 'Jordan',
    Code: '+962',
    Image: require('../assets/CountryFlag/flag_jo.png'),
  },
  {
    Currency: 'JP',
    Name: 'Japan',
    Code: '+81',
    Image: require('../assets/CountryFlag/flag_jp.png'),
  },
  {
    Currency: 'KE',
    Name: 'Kenya',
    Code: '+254',
    Image: require('../assets/CountryFlag/flag_ke.png'),
  },
  {
    Currency: 'KG',
    Name: 'Kyrgyzstan',
    Code: '+996',
    Image: require('../assets/CountryFlag/flag_kg.png'),
  },
  {
    Currency: 'KH',
    Name: 'Cambodia',
    Code: '+855',
    Image: require('../assets/CountryFlag/flag_kh.png'),
  },
  {
    Currency: 'KI',
    Name: 'Kiribati',
    Code: '+686',
    Image: require('../assets/CountryFlag/flag_ki.png'),
  },
  {
    Currency: 'KM',
    Name: 'Comoros',
    Code: '+269',
    Image: require('../assets/CountryFlag/flag_km.png'),
  },
  {
    Currency: 'KN',
    Name: 'Saint Kitts and Nevis',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_kn.png'),
  },
  {
    Currency: 'KP',
    Name: 'North Korea',
    Code: '+850',
    Image: require('../assets/CountryFlag/flag_kp.png'),
  },
  {
    Currency: 'KR',
    Name: 'South Korea',
    Code: '+82',
    Image: require('../assets/CountryFlag/flag_kr.png'),
  },
  {
    Currency: 'KW',
    Name: 'Kuwait',
    Code: '+965',
    Image: require('../assets/CountryFlag/flag_kw.png'),
  },
  {
    Currency: 'KY',
    Name: 'Cayman Islands',
    Code: '+345',
    Image: require('../assets/CountryFlag/flag_ky.png'),
  },
  {
    Currency: 'KZ',
    Name: 'Kazakhstan',
    Code: '+7',
    Image: require('../assets/CountryFlag/flag_kz.png'),
  },
  {
    Currency: 'LA',
    Name: "Lao People's Democratic Republic",
    Code: '+856',
    Image: require('../assets/CountryFlag/flag_la.png'),
  },
  {
    Currency: 'LB',
    Name: 'Lebanon',
    Code: '+961',
    Image: require('../assets/CountryFlag/flag_lb.png'),
  },
  {
    Currency: 'LC',
    Name: 'Saint Lucia',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_lc.png'),
  },
  {
    Currency: 'LI',
    Name: 'Liechtenstein',
    Code: '+423',
    Image: require('../assets/CountryFlag/flag_li.png'),
  },
  {
    Currency: 'LK',
    Name: 'Sri Lanka',
    Code: '+94',
    Image: require('../assets/CountryFlag/flag_lk.png'),
  },
  {
    Currency: 'LR',
    Name: 'Liberia',
    Code: '+231',
    Image: require('../assets/CountryFlag/flag_lr.png'),
  },
  {
    Currency: 'LS',
    Name: 'Lesotho',
    Code: '+266',
    Image: require('../assets/CountryFlag/flag_ls.png'),
  },
  {
    Currency: 'LT',
    Name: 'Lithuania',
    Code: '+370',
    Image: require('../assets/CountryFlag/flag_lt.png'),
  },
  {
    Currency: 'LU',
    Name: 'Luxembourg',
    Code: '+352',
    Image: require('../assets/CountryFlag/flag_lu.png'),
  },
  {
    Currency: 'LV',
    Name: 'Latvia',
    Code: '+371',
    Image: require('../assets/CountryFlag/flag_lv.png'),
  },
  {
    Currency: 'LY',
    Name: 'Libyan Arab Jamahiriya',
    Code: '+218',
    Image: require('../assets/CountryFlag/flag_ly.png'),
  },
  {
    Currency: 'MA',
    Name: 'Morocco',
    Code: '+212',
    Image: require('../assets/CountryFlag/flag_ma.png'),
  },
  {
    Currency: 'MC',
    Name: 'Monaco',
    Code: '+377',
    Image: require('../assets/CountryFlag/flag_mc.png'),
  },
  {
    Currency: 'MD',
    Name: 'Moldova, Republic of',
    Code: '+373',
    Image: require('../assets/CountryFlag/flag_md.png'),
  },
  {
    Currency: 'ME',
    Name: 'Montenegro',
    Code: '+382',
    Image: require('../assets/CountryFlag/flag_me.png'),
  },
  {
    Currency: 'MF',
    Name: 'Saint Martin',
    Code: '+590',
    Image: require('../assets/CountryFlag/flag_mf.png'),
  },
  {
    Currency: 'MG',
    Name: 'Madagascar',
    Code: '+261',
    Image: require('../assets/CountryFlag/flag_mg.png'),
  },
  {
    Currency: 'MH',
    Name: 'Marshall Islands',
    Code: '+692',
    Image: require('../assets/CountryFlag/flag_mh.png'),
  },
  {
    Currency: 'MK',
    Name: 'Macedonia, The Former Yugoslav Republic of',
    Code: '+389',
    Image: require('../assets/CountryFlag/flag_mk.png'),
  },
  {
    Currency: 'ML',
    Name: 'Mali',
    Code: '+223',
    Image: require('../assets/CountryFlag/flag_ml.png'),
  },
  {
    Currency: 'MM',
    Name: 'Myanmar',
    Code: '+95',
    Image: require('../assets/CountryFlag/flag_mm.png'),
  },
  {
    Currency: 'MN',
    Name: 'Mongolia',
    Code: '+976',
    Image: require('../assets/CountryFlag/flag_mn.png'),
  },
  {
    Currency: 'MO',
    Name: 'Macao',
    Code: '+853',
    Image: require('../assets/CountryFlag/flag_mo.png'),
  },
  {
    Currency: 'MP',
    Name: 'Northern Mariana Islands',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_mp.png'),
  },
  {
    Currency: 'MQ',
    Name: 'Martinique',
    Code: '+596',
    Image: require('../assets/CountryFlag/flag_mq.png'),
  },
  {
    Currency: 'MR',
    Name: 'Mauritania',
    Code: '+222',
    Image: require('../assets/CountryFlag/flag_mr.png'),
  },
  {
    Currency: 'MS',
    Name: 'Montserrat',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_ms.png'),
  },
  {
    Currency: 'MT',
    Name: 'Malta',
    Code: '+356',
    Image: require('../assets/CountryFlag/flag_mt.png'),
  },
  {
    Currency: 'MU',
    Name: 'Mauritius',
    Code: '+230',
    Image: require('../assets/CountryFlag/flag_mu.png'),
  },
  {
    Currency: 'MV',
    Name: 'Maldives',
    Code: '+960',
    Image: require('../assets/CountryFlag/flag_mv.png'),
  },
  {
    Currency: 'MW',
    Name: 'Malawi',
    Code: '+265',
    Image: require('../assets/CountryFlag/flag_mw.png'),
  },
  {
    Currency: 'MX',
    Name: 'Mexico',
    Code: '+52',
    Image: require('../assets/CountryFlag/flag_mx.png'),
  },
  {
    Currency: 'MY',
    Name: 'Malaysia',
    Code: '+60',
    Image: require('../assets/CountryFlag/flag_my.png'),
  },
  {
    Currency: 'MZ',
    Name: 'Mozambique',
    Code: '+258',
    Image: require('../assets/CountryFlag/flag_mz.png'),
  },
  {
    Currency: 'NA',
    Name: 'Namibia',
    Code: '+264',
    Image: require('../assets/CountryFlag/flag_na.png'),
  },
  {
    Currency: 'NC',
    Name: 'New Caledonia',
    Code: '+687',
    Image: require('../assets/CountryFlag/flag_nc.png'),
  },
  {
    Currency: 'NE',
    Name: 'Niger',
    Code: '+227',
    Image: require('../assets/CountryFlag/flag_ne.png'),
  },
  {
    Currency: 'NF',
    Name: 'Norfolk Island',
    Code: '+672',
    Image: require('../assets/CountryFlag/flag_nf.png'),
  },
  {
    Currency: 'NG',
    Name: 'Nigeria',
    Code: '+234',
    Image: require('../assets/CountryFlag/flag_ng.png'),
  },
  {
    Currency: 'NI',
    Name: 'Nicaragua',
    Code: '+505',
    Image: require('../assets/CountryFlag/flag_ni.png'),
  },
  {
    Currency: 'NL',
    Name: 'Netherlands',
    Code: '+31',
    Image: require('../assets/CountryFlag/flag_nl.png'),
  },
  {
    Currency: 'NO',
    Name: 'Norway',
    Code: '+47',
    Image: require('../assets/CountryFlag/flag_no.png'),
  },
  {
    Currency: 'NP',
    Name: 'Nepal',
    Code: '+977',
    Image: require('../assets/CountryFlag/flag_np.png'),
  },
  {
    Currency: 'NR',
    Name: 'Nauru',
    Code: '+674',
    Image: require('../assets/CountryFlag/flag_nr.png'),
  },
  {
    Currency: 'NU',
    Name: 'Niue',
    Code: '+683',
    Image: require('../assets/CountryFlag/flag_nu.png'),
  },
  {
    Currency: 'NZ',
    Name: 'New Zealand',
    Code: '+64',
    Image: require('../assets/CountryFlag/flag_nz.png'),
  },
  {
    Currency: 'OM',
    Name: 'Oman',
    Code: '+968',
    Image: require('../assets/CountryFlag/flag_om.png'),
  },
  {
    Currency: 'PA',
    Name: 'Panama',
    Code: '+507',
    Image: require('../assets/CountryFlag/flag_pa.png'),
  },
  {
    Currency: 'PE',
    Name: 'Peru',
    Code: '+51',
    Image: require('../assets/CountryFlag/flag_pe.png'),
  },
  {
    Currency: 'PF',
    Name: 'French Polynesia',
    Code: '+689',
    Image: require('../assets/CountryFlag/flag_pf.png'),
  },
  {
    Currency: 'PG',
    Name: 'Papua New Guinea',
    Code: '+675',
    Image: require('../assets/CountryFlag/flag_pg.png'),
  },
  {
    Currency: 'PH',
    Name: 'Philippines',
    Code: '+63',
    Image: require('../assets/CountryFlag/flag_ph.png'),
  },
  {
    Currency: 'PK',
    Name: 'Pakistan',
    Code: '+92',
    Image: require('../assets/CountryFlag/flag_pk.png'),
  },
  {
    Currency: 'PL',
    Name: 'Poland',
    Code: '+48',
    Image: require('../assets/CountryFlag/flag_pl.png'),
  },
  {
    Currency: 'PM',
    Name: 'Saint Pierre and Miquelon',
    Code: '+508',
    Image: require('../assets/CountryFlag/flag_pm.png'),
  },
  {
    Currency: 'PN',
    Name: 'Pitcairn',
    Code: '+872',
    Image: require('../assets/CountryFlag/flag_pn.png'),
  },
  {
    Currency: 'PR',
    Name: 'Puerto Rico',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_pr.png'),
  },
  {
    Currency: 'PS',
    Name: 'Palestinian Territory, Occupied',
    Code: '+970',
    Image: require('../assets/CountryFlag/flag_ps.png'),
  },
  {
    Currency: 'PT',
    Name: 'Portugal',
    Code: '+351',
    Image: require('../assets/CountryFlag/flag_pt.png'),
  },
  {
    Currency: 'PW',
    Name: 'Palau',
    Code: '+680',
    Image: require('../assets/CountryFlag/flag_pw.png'),
  },
  {
    Currency: 'PY',
    Name: 'Paraguay',
    Code: '+595',
    Image: require('../assets/CountryFlag/flag_py.png'),
  },
  {
    Currency: 'QA',
    Name: 'Qatar',
    Code: '+974',
    Image: require('../assets/CountryFlag/flag_qa.png'),
  },
  {
    Currency: 'RE',
    Name: 'Réunion',
    Code: '+262',
    Image: require('../assets/CountryFlag/flag_re.png'),
  },
  {
    Currency: 'RO',
    Name: 'Romania',
    Code: '+40',
    Image: require('../assets/CountryFlag/flag_ro.png'),
  },
  {
    Currency: 'RS',
    Name: 'Serbia',
    Code: '+381',
    Image: require('../assets/CountryFlag/flag_rs.png'),
  },
  {
    Currency: 'RU',
    Name: 'Russia',
    Code: '+7',
    Image: require('../assets/CountryFlag/flag_ru.png'),
  },
  {
    Currency: 'RW',
    Name: 'Rwanda',
    Code: '+250',
    Image: require('../assets/CountryFlag/flag_rw.png'),
  },
  {
    Currency: 'SA',
    Name: 'Saudi Arabia',
    Code: '+966',
    Image: require('../assets/CountryFlag/flag_sa.png'),
  },
  {
    Currency: 'SB',
    Name: 'Solomon Islands',
    Code: '+677',
    Image: require('../assets/CountryFlag/flag_sb.png'),
  },
  {
    Currency: 'SC',
    Name: 'Seychelles',
    Code: '+248',
    Image: require('../assets/CountryFlag/flag_sc.png'),
  },
  {
    Currency: 'SD',
    Name: 'Sudan',
    Code: '+249',
    Image: require('../assets/CountryFlag/flag_sd.png'),
  },
  {
    Currency: 'SE',
    Name: 'Sweden',
    Code: '+46',
    Image: require('../assets/CountryFlag/flag_se.png'),
  },
  {
    Currency: 'SG',
    Name: 'Singapore',
    Code: '+65',
    Image: require('../assets/CountryFlag/flag_sg.png'),
  },
  {
    Currency: 'SH',
    Name: 'Saint Helena, Ascension and Tristan Da Cunha',
    Code: '+290',
    Image: require('../assets/CountryFlag/flag_sh.png'),
  },
  {
    Currency: 'SI',
    Name: 'Slovenia',
    Code: '+386',
    Image: require('../assets/CountryFlag/flag_si.png'),
  },
  {
    Currency: 'SJ',
    Name: 'Svalbard and Jan Mayen',
    Code: '+47',
    Image: require('../assets/CountryFlag/flag_sj.png'),
  },
  {
    Currency: 'SK',
    Name: 'Slovakia',
    Code: '+421',
    Image: require('../assets/CountryFlag/flag_sk.png'),
  },
  {
    Currency: 'SL',
    Name: 'Sierra Leone',
    Code: '+232',
    Image: require('../assets/CountryFlag/flag_sl.png'),
  },
  {
    Currency: 'SM',
    Name: 'San Marino',
    Code: '+378',
    Image: require('../assets/CountryFlag/flag_sm.png'),
  },
  {
    Currency: 'SN',
    Name: 'Senegal',
    Code: '+221',
    Image: require('../assets/CountryFlag/flag_sn.png'),
  },
  {
    Currency: 'SO',
    Name: 'Somalia',
    Code: '+252',
    Image: require('../assets/CountryFlag/flag_so.png'),
  },
  {
    Currency: 'SR',
    Name: 'Suriname',
    Code: '+597',
    Image: require('../assets/CountryFlag/flag_sr.png'),
  },
  {
    Currency: 'SS',
    Name: 'South Sudan',
    Code: '+211',
    Image: require('../assets/CountryFlag/flag_ss.png'),
  },
  {
    Currency: 'ST',
    Name: 'Sao Tome and Principe',
    Code: '+239',
    Image: require('../assets/CountryFlag/flag_st.png'),
  },
  {
    Currency: 'SV',
    Name: 'El Salvador',
    Code: '+503',
    Image: require('../assets/CountryFlag/flag_sv.png'),
  },
  {
    Currency: 'SX',
    Name: '  Sint Maarten',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_sx.png'),
  },
  {
    Currency: 'SY',
    Name: 'Syrian Arab Republic',
    Code: '+963',
    Image: require('../assets/CountryFlag/flag_sy.png'),
  },
  {
    Currency: 'SZ',
    Name: 'Swaziland',
    Code: '+268',
    Image: require('../assets/CountryFlag/flag_sz.png'),
  },
  {
    Currency: 'TC',
    Name: 'Turks and Caicos Islands',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_tc.png'),
  },
  {
    Currency: 'TD',
    Name: 'Chad',
    Code: '+235',
    Image: require('../assets/CountryFlag/flag_td.png'),
  },
  {
    Currency: 'TF',
    Name: 'French Southern Territories',
    Code: '+262',
    Image: require('../assets/CountryFlag/flag_tf.png'),
  },
  {
    Currency: 'TG',
    Name: 'Togo',
    Code: '+228',
    Image: require('../assets/CountryFlag/flag_tg.png'),
  },
  {
    Currency: 'TH',
    Name: 'Thailand',
    Code: '+66',
    Image: require('../assets/CountryFlag/flag_th.png'),
  },
  {
    Currency: 'TJ',
    Name: 'Tajikistan',
    Code: '+992',
    Image: require('../assets/CountryFlag/flag_tj.png'),
  },
  {
    Currency: 'TK',
    Name: 'Tokelau',
    Code: '+690',
    Image: require('../assets/CountryFlag/flag_tk.png'),
  },
  {
    Currency: 'TL',
    Name: 'East Timor',
    Code: '+670',
    Image: require('../assets/CountryFlag/flag_tl.png'),
  },
  {
    Currency: 'TM',
    Name: 'Turkmenistan',
    Code: '+993',
    Image: require('../assets/CountryFlag/flag_tm.png'),
  },
  {
    Currency: 'TN',
    Name: 'Tunisia',
    Code: '+216',
    Image: require('../assets/CountryFlag/flag_tn.png'),
  },
  {
    Currency: 'TO',
    Name: 'Tonga',
    Code: '+676',
    Image: require('../assets/CountryFlag/flag_to.png'),
  },
  {
    Currency: 'TR',
    Name: 'Turkey',
    Code: '+90',
    Image: require('../assets/CountryFlag/flag_tr.png'),
  },
  {
    Currency: 'TT',
    Name: 'Trinidad and Tobago',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_tt.png'),
  },
  {
    Currency: 'TV',
    Name: 'Tuvalu',
    Code: '+688',
    Image: require('../assets/CountryFlag/flag_tv.png'),
  },
  {
    Currency: 'TW',
    Name: 'Taiwan',
    Code: '+886',
    Image: require('../assets/CountryFlag/flag_tw.png'),
  },
  {
    Currency: 'TZ',
    Name: 'Tanzania, United Republic of',
    Code: '+255',
    Image: require('../assets/CountryFlag/flag_tz.png'),
  },
  {
    Currency: 'UA',
    Name: 'Ukraine',
    Code: '+380',
    Image: require('../assets/CountryFlag/flag_ua.png'),
  },
  {
    Currency: 'UG',
    Name: 'Uganda',
    Code: '+256',
    Image: require('../assets/CountryFlag/flag_ug.png'),
  },
  {
    Currency: 'US',
    Name: 'United States',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_us.png'),
  },
  {
    Currency: 'UY',
    Name: 'Uruguay',
    Code: '+598',
    Image: require('../assets/CountryFlag/flag_uy.png'),
  },
  {
    Currency: 'UZ',
    Name: 'Uzbekistan',
    Code: '+998',
    Image: require('../assets/CountryFlag/flag_uz.png'),
  },
  {
    Currency: 'VA',
    Name: 'Holy See (Vatican City State)',
    Code: '+379',
    Image: require('../assets/CountryFlag/flag_va.png'),
  },
  {
    Currency: 'VC',
    Name: 'Saint Vincent and the Grenadines',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_vc.png'),
  },
  {
    Currency: 'VE',
    Name: 'Venezuela, Bolivarian Republic of',
    Code: '+58',
    Image: require('../assets/CountryFlag/flag_ve.png'),
  },
  {
    Currency: 'VG',
    Name: 'Virgin Islands, British',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_vg.png'),
  },
  {
    Currency: 'VI',
    Name: 'Virgin Islands, U.S.',
    Code: '+1',
    Image: require('../assets/CountryFlag/flag_vi.png'),
  },
  {
    Currency: 'VN',
    Name: 'Viet Nam',
    Code: '+84',
    Image: require('../assets/CountryFlag/flag_vn.png'),
  },
  {
    Currency: 'VU',
    Name: 'Vanuatu',
    Code: '+678',
    Image: require('../assets/CountryFlag/flag_vu.png'),
  },
  {
    Currency: 'WF',
    Name: 'Wallis and Futuna',
    Code: '+681',
    Image: require('../assets/CountryFlag/flag_wf.png'),
  },
  {
    Currency: 'WS',
    Name: 'Samoa',
    Code: '+685',
    Image: require('../assets/CountryFlag/flag_ws.png'),
  },
  {
    Currency: 'XK',
    Name: 'Kosovo',
    Code: '+383',
    Image: require('../assets/CountryFlag/flag_xk.png'),
  },
  {
    Currency: 'YE',
    Name: 'Yemen',
    Code: '+967',
    Image: require('../assets/CountryFlag/flag_ye.png'),
  },
  {
    Currency: 'YT',
    Name: 'Mayotte',
    Code: '+262',
    Image: require('../assets/CountryFlag/flag_yt.png'),
  },
  {
    Currency: 'ZA',
    Name: 'South Africa',
    Code: '+27',
    Image: require('../assets/CountryFlag/flag_za.png'),
  },
  {
    Currency: 'ZM',
    Name: 'Zambia',
    Code: '+260',
    Image: require('../assets/CountryFlag/flag_zm.png'),
  },
  {
    Currency: 'ZW',
    Name: 'Zimbabwe',
    Code: '+263',
    Image: require('../assets/CountryFlag/flag_zw.png'),
  },
];
const CountryPicker: React.FC = ({ navigation: { goBack } }) => {
  const [countrySearch, setCountrySearch] = useState('');
  const [CountryData, setCountryData] = useState([...CountryList]);
  const [lastText, setLastText] = useState('');
  const [inputShow, setInputShow] = useState(false);
  // console.log('item',CountryData);

  const Search = () => {
    setLastText(countrySearch);
    // console.log('countrySearch<lastText', countrySearch < lastText);
    // console.log('countrySearch>lastText', countrySearch > lastText);

    if (countrySearch < lastText) {
      // console.log('items Length', CountryData);
      setCountryData(
        CountryList.filter((item) => {
          if (
            item.Name.toLowerCase().includes(countrySearch.toLowerCase()) ||
            item.Code?.includes(countrySearch)
          ) {
            // console.log('lastText', item);
            return item;
          }
        }),
      );
    } else if (countrySearch > lastText) {
      // console.log('items Length data', CountryData);
      setCountryData(
        CountryData.filter((item) => {
          if (
            item.Name.toLowerCase().includes(countrySearch.toLowerCase()) ||
            item.Code?.includes(countrySearch)
          ) {
            // console.log('CountryData', item);
            return item;
          }
        }),
      );
    }
    else {
      setCountryData(CountryList)
    }
  };

  useEffect(() => {
    Search();
  }, [countrySearch]);
  
/*   useEffect(() => {
    Search();
  }, [inputShow]); */


  return (
    <>
    <StatusBar
    backgroundColor={Colors.white}
    barStyle='dark-content'
    />
    <SafeAreaView style={styles.main}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal:ResponsivePixels._10}}>
        <TouchableWithoutFeedback
          onPress={() => {
            (!inputShow)&& goBack()
            setInputShow(false);
            // setLastText('');
              setCountrySearch('');
              // setCountryData(CountryList);
          }}>
          <Image
            // source={require('.../assets/screens/CountryFlag/ic_arrow_back.png')}
            source={require('../assets/Images/ic_arrow_back.png')}
            style={{
              width: ResponsivePixels._35,
              height: ResponsivePixels._35,
              tintColor: Colors.buttonColor,
              // marginRight: ResponsivePixels._5,
            }}
          />
        </TouchableWithoutFeedback>
        {inputShow ? (
          <TextInput
            placeholder="Please Enter Country"
            value={countrySearch}
            keyboardAppearance={'dark'}
            autoFocus
            onChangeText={setCountrySearch}
            style={styles.input}
          />
        ) : (
          <>
          
          <Text
            style={{
              width: '85%',
              textAlign: 'center',
              alignSelf:'center',
              paddingTop: ResponsivePixels._7,
              height: ResponsivePixels._40,
            fontFamily:Fonts.name.medium,
              fontSize:Fonts.size._20px,
            }}>
            Country Picker
          </Text>
           <TouchableWithoutFeedback
           style={{marginLeft: ResponsivePixels._10}}
           onPress={() => {
             setInputShow(true);
           }}>
           <Image
             source= {require('../assets/Images/search.png')}
             style={{width: ResponsivePixels._20, height: ResponsivePixels._20}}
           />
         </TouchableWithoutFeedback>
         </>
        )}

       
      </View>
      {
        <FlatList
          style={{marginTop: ResponsivePixels._10}}
          data={CountryData}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          renderItem={CountryData => (
            <TouchableWithoutFeedback
              style={{
                marginVertical: ResponsivePixels._5,
                paddingHorizontal: ResponsivePixels._10,
                flexDirection: 'row',
              }}
              onPress={() => {
                ToastAndroid.show(
                  `${CountryData.item.Name} ${CountryData.item.Code}`,ToastAndroid.SHORT,
                );
                
                // setCountrySearch(CountryData.item.Name);
              }}>
              <Image
                style={{width: ResponsivePixels._25, height: ResponsivePixels._25}}
                source={CountryData.item.Image}
              />
              <Text
                style={{
                  paddingHorizontal: ResponsivePixels._10,
                  fontFamily:Fonts.name.OpenSans_Bold,
                  fontSize:Fonts.size._15px
                }}>{` ${CountryData.item.Name}  (${CountryData.item.Code})`}</Text>
            </TouchableWithoutFeedback>
          )}></FlatList>
      }
    </SafeAreaView>
    </>
  );
};
export default CountryPicker;
const styles = StyleSheet.create({
  main: {
    paddingHorizontal:ResponsivePixels._20,
    paddingTop:ResponsivePixels._10,
    backgroundColor: Colors.white,
    flex: 1,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    paddingVertical: ResponsivePixels._5,
    marginHorizontal:ResponsivePixels._5,
    paddingHorizontal: ResponsivePixels._15,
    height: ResponsivePixels._40,
    // textTransform:'capitalize',
    borderRadius: ResponsivePixels._10,
    width: wp('80%'),
  },
  countryList: {
    // paddingVertical: 20,
    paddingHorizontal: ResponsivePixels._50,
  },
  CountryText: {
    marginBottom: ResponsivePixels._20,
    fontSize: ResponsivePixels._20,
    textAlign: 'center',
    borderWidth: 1,
    padding: ResponsivePixels._10,
  },
});
