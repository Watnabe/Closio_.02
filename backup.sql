-- MySQL dump 10.13  Distrib 5.1.73, for apple-darwin10.3.0 (i386)
--
-- Host: localhost    Database: closioSPA
-- ------------------------------------------------------
-- Server version	5.1.73

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `LinkedIn`
--

DROP TABLE IF EXISTS `LinkedIn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LinkedIn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` text NOT NULL,
  `email` varchar(155) NOT NULL,
  `connections` text NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LinkedIn`
--

LOCK TABLES `LinkedIn` WRITE;
/*!40000 ALTER TABLE `LinkedIn` DISABLE KEYS */;
INSERT INTO `LinkedIn` VALUES (23,'O:8:\"stdClass\":4:{s:9:\"firstName\";s:4:\"mike\";s:8:\"headline\";s:48:\"Founder, Sr. Software Engineer at Enneagineering\";s:8:\"lastName\";s:8:\"mccarron\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=91723639&authType=name&authToken=brV_&trk=api*a3524211*s3596611*\";}}','s:22:\"mmccarr1@mail.ccsf.edu\";','O:8:\"stdClass\":2:{s:6:\"_total\";i:29;s:6:\"values\";a:29:{i:0;O:8:\"stdClass\":8:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:rLka\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/DoeEcG1X0m\";}s:9:\"firstName\";s:5:\"tammy\";s:8:\"headline\";s:19:\"community organizer\";s:2:\"id\";s:10:\"DoeEcG1X0m\";s:8:\"industry\";s:33:\"Nonprofit Organization Management\";s:8:\"lastName\";s:6:\"alpers\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=182363073&authType=name&authToken=rLka&trk=api*a3524211*s3596611*\";}}i:1;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:pWAl\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/_OrcT_N-cP\";}s:9:\"firstName\";s:5:\"Nizar\";s:8:\"headline\";s:40:\"Director Product Management; Avid Golfer\";s:2:\"id\";s:10:\"_OrcT_N-cP\";s:8:\"industry\";s:17:\"Computer Software\";s:8:\"lastName\";s:5:\"Ayadi\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_V24ZqXHbICM8HeUy4EIbqQsWI8auoDUy4D2FqQEzq5VgzWupnoHNs6ORLamtWosKRfVQR3NJnMQv\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=189667776&authType=name&authToken=pWAl&trk=api*a3524211*s3596611*\";}}i:2;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:dZ6f\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/pVnoAUJF47\";}s:9:\"firstName\";s:6:\"Martin\";s:8:\"headline\";s:58:\"Technical Advisor for Recruiting at Connery Consulting LLC\";s:2:\"id\";s:10:\"pVnoAUJF47\";s:8:\"industry\";s:15:\"Human Resources\";s:8:\"lastName\";s:5:\"Baker\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_UciCehFOKmDDr1pbMK_leCbptEVi-zSbMvcje_92S7a-DlsFcA1m6iCGyXsjl-uwsq3ybXeb1-8L\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=272254049&authType=name&authToken=dZ6f&trk=api*a3524211*s3596611*\";}}i:3;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:bACr\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/va9UODtRby\";}s:9:\"firstName\";s:6:\"Austen\";s:8:\"headline\";s:36:\"CEO and Founder at Breakout Commerce\";s:2:\"id\";s:10:\"va9UODtRby\";s:8:\"industry\";s:8:\"Internet\";s:8:\"lastName\";s:9:\"Bernstein\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:26:\"Greater New York City Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_cDHk-h2oF9VxeehrMEsB-_WVFKxxHITrv2pR-_7s4Pw7c7nKUI4eyiRNd408w28p9aosjXjz2qDe\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=68466354&authType=name&authToken=bACr&trk=api*a3524211*s3596611*\";}}i:4;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:YeYI\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/LP-VKmb_eE\";}s:9:\"firstName\";s:4:\"Anna\";s:8:\"headline\";s:8:\"Designer\";s:2:\"id\";s:10:\"LP-VKmb_eE\";s:8:\"industry\";s:6:\"Design\";s:8:\"lastName\";s:9:\"Beurskens\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_5J73_mC9sJE9_brzbYY-_D1BnpYcTXTzIgUY_DAoW0EFY8nvd0xDDS5XZNOHGi8JkVS0uE_yfCey\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=244726300&authType=name&authToken=YeYI&trk=api*a3524211*s3596611*\";}}i:5;O:8:\"stdClass\":8:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:NHQL\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/8zy-f1vixy\";}s:9:\"firstName\";s:3:\"Ron\";s:8:\"headline\";s:43:\"Chairman & CEO at MEVIO / BiteSize Networks\";s:2:\"id\";s:10:\"8zy-f1vixy\";s:8:\"industry\";s:13:\"Entertainment\";s:8:\"lastName\";s:5:\"Bloom\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:24:\"Greater Los Angeles Area\";}s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:103:\"http://www.linkedin.com/profile/view?id=5128189&authType=name&authToken=NHQL&trk=api*a3524211*s3596611*\";}}i:6;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:BbFN\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/pAon3RQ_2H\";}s:9:\"firstName\";s:4:\"Sara\";s:8:\"headline\";s:45:\"Graduate Student in Urban Planning and Policy\";s:2:\"id\";s:10:\"pAon3RQ_2H\";s:8:\"industry\";s:8:\"Research\";s:8:\"lastName\";s:5:\"Ellis\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:20:\"Greater Chicago Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_-vl8EnK0KWKx--fHtBn0EqGjrHQtKlmHKc50EqACfmtC7zMeYPTuXN5uOL6S1n7X1nPY5PfBMDOY\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=97597276&authType=name&authToken=BbFN&trk=api*a3524211*s3596611*\";}}i:7;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:MmdZ\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/R-rhwHLKhp\";}s:9:\"firstName\";s:5:\"Chris\";s:8:\"headline\";s:39:\"Recruiting Manager/ Technical Recruiter\";s:2:\"id\";s:10:\"R-rhwHLKhp\";s:8:\"industry\";s:23:\"Staffing and Recruiting\";s:8:\"lastName\";s:5:\"Giles\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_hTReA0DSQ-BURdKACFVUAg7fktlUJuAAGLfcAy2tUq5w6H6lubIkxpZyExAkswrj3CJnOR-WBx3M\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=84977200&authType=name&authToken=MmdZ&trk=api*a3524211*s3596611*\";}}i:8;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:RdpJ\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/3iFtUWchnR\";}s:9:\"firstName\";s:6:\"Thomas\";s:8:\"headline\";s:57:\"Java, SQL, Android Programmer and Customer Service Expert\";s:2:\"id\";s:10:\"3iFtUWchnR\";s:8:\"industry\";s:17:\"Computer Software\";s:8:\"lastName\";s:7:\"Griffin\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_Dv0vDVqpeg86-dkw_l2EDMbKHR6LrfLw7tIoDMN_cg-zfw-ITPfM_JhS69QVPHXb2njwGO60nAQV\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=82016330&authType=name&authToken=RdpJ&trk=api*a3524211*s3596611*\";}}i:9;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:Vf1S\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/SxcpY0yNz5\";}s:9:\"firstName\";s:4:\"Erik\";s:8:\"headline\";s:33:\"VP of Talent Operations at Vungle\";s:2:\"id\";s:10:\"SxcpY0yNz5\";s:8:\"industry\";s:17:\"Computer Software\";s:8:\"lastName\";s:7:\"H. Juhl\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_fsPnUR-zuQtw_4e2TYz5UZnB2kL6TOe2DObdUZz61GA9Ysxu_y_sz4THGW5JGJWhaMleN0bTdnyg\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:102:\"http://www.linkedin.com/profile/view?id=843450&authType=name&authToken=Vf1S&trk=api*a3524211*s3596611*\";}}i:10;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:QQ9U\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/MEw_DzjR0y\";}s:9:\"firstName\";s:17:\"Barbara Jane (BJ)\";s:8:\"headline\";s:25:\"Co-Founder at co~luminate\";s:2:\"id\";s:10:\"MEw_DzjR0y\";s:8:\"industry\";s:28:\"Health, Wellness and Fitness\";s:8:\"lastName\";s:12:\"Harden Jones\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:30:\"Asheville, North Carolina Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_mB1VmUX_DjCzlMqwuvh5m4qi7yQ5Pxvw2KF5m4v_KVtvuRCIGli9hZ3STl6srZNb7NAXTxbLt_PO\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=65979991&authType=name&authToken=QQ9U&trk=api*a3524211*s3596611*\";}}i:11;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:DOC8\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/GjVlyCNdD6\";}s:9:\"firstName\";s:4:\"Jeff\";s:8:\"headline\";s:28:\"Systems Manager at CCPI, Inc\";s:2:\"id\";s:10:\"GjVlyCNdD6\";s:8:\"industry\";s:11:\"Photography\";s:8:\"lastName\";s:6:\"Harvey\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"Norfolk, Virginia Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_V24ZqLsHWCw3HIoyNHdFqbwFI8aSoDUyZD2FqQEzq5VgzWupnoHNs6ORLamtWosKRfVQR3q8ytQv\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=131574885&authType=name&authToken=DOC8&trk=api*a3524211*s3596611*\";}}i:12;O:8:\"stdClass\":3:{s:9:\"firstName\";s:7:\"private\";s:2:\"id\";s:7:\"private\";s:8:\"lastName\";s:7:\"private\";}i:13;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:R2ph\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/4ENkFY9NS0\";}s:9:\"firstName\";s:6:\"Daniel\";s:8:\"headline\";s:18:\"CEO at Three Rings\";s:2:\"id\";s:10:\"4ENkFY9NS0\";s:8:\"industry\";s:14:\"Computer Games\";s:8:\"lastName\";s:5:\"James\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_SEVdfpeBb4ldwe_Xf2JnfxEQbp9XIm-XfHanfxsBZJGqqoLk3uoLT0aMWtnReW1HuW4ch4ep7ubF\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:101:\"http://www.linkedin.com/profile/view?id=45839&authType=name&authToken=R2ph&trk=api*a3524211*s3596611*\";}}i:14;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:7kQQ\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/5wY5wOdJTM\";}s:9:\"firstName\";s:4:\"Gwen\";s:8:\"headline\";s:18:\"Owner, Ace Mailing\";s:2:\"id\";s:10:\"5wY5wOdJTM\";s:8:\"industry\";s:25:\"Marketing and Advertising\";s:8:\"lastName\";s:6:\"Kaplan\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_66VqguDawqoRsDnheTeFgaShINMBsmQhkkawgfy-qlSb5ol8Eho417HpLVJeJWb2FL4oteGZwIEf\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=14405360&authType=name&authToken=7kQQ&trk=api*a3524211*s3596611*\";}}i:15;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:xrtz\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/LyCcRjk0m5\";}s:9:\"firstName\";s:5:\"Shirl\";s:8:\"headline\";s:119:\"CPA Firm l Tax Professionals l Small Businessl Accountant l QuickBooks Training l Business Consultant l Payroll l Taxes\";s:2:\"id\";s:10:\"LyCcRjk0m5\";s:8:\"industry\";s:10:\"Accounting\";s:8:\"lastName\";s:4:\"Matz\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:26:\"Cleveland/Akron, Ohio Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_-vl8EBByKe-grqmHy-K1Eqt-rwQPKlmHrN50EqACfmtC7zMeYPTuXN5uOL6S1n7X1nPY5PihE7HY\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:103:\"http://www.linkedin.com/profile/view?id=9417513&authType=name&authToken=xrtz&trk=api*a3524211*s3596611*\";}}i:16;O:8:\"stdClass\":8:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:pE1F\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/n3dRzgYhFV\";}s:9:\"firstName\";s:5:\"Abbas\";s:8:\"headline\";s:42:\"professor at City College of San Francisco\";s:2:\"id\";s:10:\"n3dRzgYhFV\";s:8:\"industry\";s:16:\"Higher Education\";s:8:\"lastName\";s:8:\"Moghtani\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=55133117&authType=name&authToken=pE1F&trk=api*a3524211*s3596611*\";}}i:17;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:s4Oe\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/_XS6r-e1Ud\";}s:9:\"firstName\";s:4:\"John\";s:8:\"headline\";s:19:\"Community Organizer\";s:2:\"id\";s:10:\"_XS6r-e1Ud\";s:8:\"industry\";s:27:\"Civic & Social Organization\";s:8:\"lastName\";s:5:\"Nulty\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_SLdsnxe2dCbdBWetDkodnjE8WTlkUWZtfXjLnpRpnk5NkD7-3iJn4y7-bfAU4mMYu6IkMUdAOMp6\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=58910416&authType=name&authToken=s4Oe&trk=api*a3524211*s3596611*\";}}i:18;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:k9c1\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/21CFMCbAGe\";}s:9:\"firstName\";s:7:\"Michael\";s:8:\"headline\";s:88:\"Housing Development Advisory Committee Member at St. Anthony\'s Foundation Senior Housing\";s:2:\"id\";s:10:\"21CFMCbAGe\";s:8:\"industry\";s:33:\"Nonprofit Organization Management\";s:8:\"lastName\";s:5:\"Nulty\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_uQ-Va4ZruYiXv4XEmh15aUe82JX6BgvEmX65asJ81Vr9eJCoh8G98VSmGlkJqsNQS5rX3jFf5YcI\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=41058832&authType=name&authToken=k9c1&trk=api*a3524211*s3596611*\";}}i:19;O:8:\"stdClass\":8:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:h0Ej\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/BfBQEooOSm\";}s:9:\"firstName\";s:5:\"roark\";s:8:\"headline\";s:24:\"Equitaire Associates Inc\";s:2:\"id\";s:10:\"BfBQEooOSm\";s:8:\"industry\";s:11:\"Real Estate\";s:8:\"lastName\";s:7:\"o\'neill\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=91243315&authType=name&authToken=h0Ej&trk=api*a3524211*s3596611*\";}}i:20;O:8:\"stdClass\":8:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:JUFt\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/RdubDVTZ3H\";}s:9:\"firstName\";s:5:\"Turan\";s:8:\"headline\";s:38:\"Attended City College of San Francisco\";s:2:\"id\";s:10:\"RdubDVTZ3H\";s:8:\"industry\";s:17:\"Computer Software\";s:8:\"lastName\";s:7:\"Ozdemir\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=310535176&authType=name&authToken=JUFt&trk=api*a3524211*s3596611*\";}}i:21;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:m-hJ\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/GCAYfspJpJ\";}s:9:\"firstName\";s:7:\"Matthew\";s:8:\"headline\";s:88:\"Marketing Coordinator at The Plan Sponsor University & The Retirement Advisor University\";s:2:\"id\";s:10:\"GCAYfspJpJ\";s:8:\"industry\";s:35:\"Information Technology and Services\";s:8:\"lastName\";s:4:\"Pasa\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:29:\"West Palm Beach, Florida Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_fjdmjjFHN-iwuQ3TfOVljxFdNcnoaLATDxjAjY5VwqCVAT63_RJCPOAqsx9zSGrSaOIK-JBzwRMs\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=115565195&authType=name&authToken=m-hJ&trk=api*a3524211*s3596611*\";}}i:22;O:8:\"stdClass\":8:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:Ee1-\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/lvhcT69x5x\";}s:9:\"firstName\";s:5:\"Nancy\";s:8:\"headline\";s:19:\"Technical Recruiter\";s:2:\"id\";s:10:\"lvhcT69x5x\";s:8:\"industry\";s:19:\"Computer Networking\";s:8:\"lastName\";s:4:\"Pham\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=309602623&authType=name&authToken=Ee1-&trk=api*a3524211*s3596611*\";}}i:23;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:M6aD\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/LH_2_oVwBs\";}s:9:\"firstName\";s:3:\"Amy\";s:8:\"headline\";s:32:\"Production Manager/Editor/Artist\";s:2:\"id\";s:10:\"LH_2_oVwBs\";s:8:\"industry\";s:10:\"Publishing\";s:8:\"lastName\";s:8:\"Popovich\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_ZSvRnLoL2kRfW4sYZozknbZbuGD7WORYsETknbWvPkJxns2Oqw5c4FjUCfSKoJVtMmBLMhR1JJpM\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=40729020&authType=name&authToken=M6aD&trk=api*a3524211*s3596611*\";}}i:24;O:8:\"stdClass\":3:{s:9:\"firstName\";s:7:\"private\";s:2:\"id\";s:7:\"private\";s:8:\"lastName\";s:7:\"private\";}i:25;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:b1e2\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/HdNwABz2tJ\";}s:9:\"firstName\";s:8:\"Veronika\";s:8:\"headline\";s:39:\"Founder and CEO at The Empowerment Plan\";s:2:\"id\";s:10:\"HdNwABz2tJ\";s:8:\"industry\";s:6:\"Design\";s:8:\"lastName\";s:5:\"Scott\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:20:\"Greater Detroit Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_tm_nI17VhHLxk4dFrui5IlSs2IcOX4eFpoBdIlao1aifRyxbOePs5AsXG5Bhb0WIPSTeX9r0f4vY\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=55388018&authType=name&authToken=b1e2&trk=api*a3524211*s3596611*\";}}i:26;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:qRPg\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/IwInYgRZc9\";}s:9:\"firstName\";s:6:\"Silver\";s:8:\"headline\";s:34:\"Founder and CEO at Veret Media LLC\";s:2:\"id\";s:10:\"IwInYgRZc9\";s:8:\"industry\";s:25:\"Marketing and Advertising\";s:8:\"lastName\";s:8:\"Stoltsen\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_DBwsjMbYe-lz0wkDDrELjVvGoAb50wND7KxLjVvYzqPvhf_STlUnPs3KXxFsyuv32NWk-gbEwD7O\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=16501233&authType=name&authToken=qRPg&trk=api*a3524211*s3596611*\";}}i:27;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:Wdmr\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/F6-s6cW1Fi\";}s:9:\"firstName\";s:6:\"Rafael\";s:8:\"headline\";s:35:\"Sales Representative at UBM TechWeb\";s:2:\"id\";s:10:\"F6-s6cW1Fi\";s:8:\"industry\";s:12:\"Online Media\";s:8:\"lastName\";s:6:\"Vallin\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_cCVuh_j79xRj4bizviy1hh7l9OO0ZGtzz6a1hhaldZofbQ5vUko8m8sx41YhRLPJ9T4tfbpsCpVv\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=109714642&authType=name&authToken=Wdmr&trk=api*a3524211*s3596611*\";}}i:28;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:10Dr\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/HXrv85gyCH\";}s:9:\"firstName\";s:3:\"Edo\";s:8:\"headline\";s:36:\"Product Manager at Intel Corporation\";s:2:\"id\";s:10:\"HXrv85gyCH\";s:8:\"industry\";s:7:\"Banking\";s:8:\"lastName\";s:8:\"Williams\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_O-y3pnqPBN_u0h87OAgOpznrzBLm1_37yzeYpqbGotAY2F9ftquDtN12RJ5lKkh_0AY01PMLjkxE\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=24260594&authType=name&authToken=10Dr&trk=api*a3524211*s3596611*\";}}}}',NULL),(24,'O:8:\"stdClass\":4:{s:9:\"firstName\";s:4:\"mike\";s:8:\"headline\";s:48:\"Founder, Sr. Software Engineer at Enneagineering\";s:8:\"lastName\";s:8:\"mccarron\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=91723639&authType=name&authToken=brV_&trk=api*a3524211*s3596611*\";}}','s:22:\"mmccarr1@mail.ccsf.edu\";','O:8:\"stdClass\":2:{s:6:\"_total\";i:29;s:6:\"values\";a:29:{i:0;O:8:\"stdClass\":8:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:rLka\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/DoeEcG1X0m\";}s:9:\"firstName\";s:5:\"tammy\";s:8:\"headline\";s:19:\"community organizer\";s:2:\"id\";s:10:\"DoeEcG1X0m\";s:8:\"industry\";s:33:\"Nonprofit Organization Management\";s:8:\"lastName\";s:6:\"alpers\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=182363073&authType=name&authToken=rLka&trk=api*a3524211*s3596611*\";}}i:1;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:pWAl\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/_OrcT_N-cP\";}s:9:\"firstName\";s:5:\"Nizar\";s:8:\"headline\";s:40:\"Director Product Management; Avid Golfer\";s:2:\"id\";s:10:\"_OrcT_N-cP\";s:8:\"industry\";s:17:\"Computer Software\";s:8:\"lastName\";s:5:\"Ayadi\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_V24ZqXHbICM8HeUy4EIbqQsWI8auoDUy4D2FqQEzq5VgzWupnoHNs6ORLamtWosKRfVQR3NJnMQv\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=189667776&authType=name&authToken=pWAl&trk=api*a3524211*s3596611*\";}}i:2;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:dZ6f\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/pVnoAUJF47\";}s:9:\"firstName\";s:6:\"Martin\";s:8:\"headline\";s:58:\"Technical Advisor for Recruiting at Connery Consulting LLC\";s:2:\"id\";s:10:\"pVnoAUJF47\";s:8:\"industry\";s:15:\"Human Resources\";s:8:\"lastName\";s:5:\"Baker\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_UciCehFOKmDDr1pbMK_leCbptEVi-zSbMvcje_92S7a-DlsFcA1m6iCGyXsjl-uwsq3ybXeb1-8L\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=272254049&authType=name&authToken=dZ6f&trk=api*a3524211*s3596611*\";}}i:3;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:bACr\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/va9UODtRby\";}s:9:\"firstName\";s:6:\"Austen\";s:8:\"headline\";s:36:\"CEO and Founder at Breakout Commerce\";s:2:\"id\";s:10:\"va9UODtRby\";s:8:\"industry\";s:8:\"Internet\";s:8:\"lastName\";s:9:\"Bernstein\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:26:\"Greater New York City Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_cDHk-h2oF9VxeehrMEsB-_WVFKxxHITrv2pR-_7s4Pw7c7nKUI4eyiRNd408w28p9aosjXjz2qDe\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=68466354&authType=name&authToken=bACr&trk=api*a3524211*s3596611*\";}}i:4;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:YeYI\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/LP-VKmb_eE\";}s:9:\"firstName\";s:4:\"Anna\";s:8:\"headline\";s:8:\"Designer\";s:2:\"id\";s:10:\"LP-VKmb_eE\";s:8:\"industry\";s:6:\"Design\";s:8:\"lastName\";s:9:\"Beurskens\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_5J73_mC9sJE9_brzbYY-_D1BnpYcTXTzIgUY_DAoW0EFY8nvd0xDDS5XZNOHGi8JkVS0uE_yfCey\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=244726300&authType=name&authToken=YeYI&trk=api*a3524211*s3596611*\";}}i:5;O:8:\"stdClass\":8:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:NHQL\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/8zy-f1vixy\";}s:9:\"firstName\";s:3:\"Ron\";s:8:\"headline\";s:43:\"Chairman & CEO at MEVIO / BiteSize Networks\";s:2:\"id\";s:10:\"8zy-f1vixy\";s:8:\"industry\";s:13:\"Entertainment\";s:8:\"lastName\";s:5:\"Bloom\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:24:\"Greater Los Angeles Area\";}s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:103:\"http://www.linkedin.com/profile/view?id=5128189&authType=name&authToken=NHQL&trk=api*a3524211*s3596611*\";}}i:6;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:BbFN\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/pAon3RQ_2H\";}s:9:\"firstName\";s:4:\"Sara\";s:8:\"headline\";s:45:\"Graduate Student in Urban Planning and Policy\";s:2:\"id\";s:10:\"pAon3RQ_2H\";s:8:\"industry\";s:8:\"Research\";s:8:\"lastName\";s:5:\"Ellis\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:20:\"Greater Chicago Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_-vl8EnK0KWKx--fHtBn0EqGjrHQtKlmHKc50EqACfmtC7zMeYPTuXN5uOL6S1n7X1nPY5PfBMDOY\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=97597276&authType=name&authToken=BbFN&trk=api*a3524211*s3596611*\";}}i:7;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:MmdZ\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/R-rhwHLKhp\";}s:9:\"firstName\";s:5:\"Chris\";s:8:\"headline\";s:39:\"Recruiting Manager/ Technical Recruiter\";s:2:\"id\";s:10:\"R-rhwHLKhp\";s:8:\"industry\";s:23:\"Staffing and Recruiting\";s:8:\"lastName\";s:5:\"Giles\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_hTReA0DSQ-BURdKACFVUAg7fktlUJuAAGLfcAy2tUq5w6H6lubIkxpZyExAkswrj3CJnOR-WBx3M\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=84977200&authType=name&authToken=MmdZ&trk=api*a3524211*s3596611*\";}}i:8;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:RdpJ\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/3iFtUWchnR\";}s:9:\"firstName\";s:6:\"Thomas\";s:8:\"headline\";s:57:\"Java, SQL, Android Programmer and Customer Service Expert\";s:2:\"id\";s:10:\"3iFtUWchnR\";s:8:\"industry\";s:17:\"Computer Software\";s:8:\"lastName\";s:7:\"Griffin\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_Dv0vDVqpeg86-dkw_l2EDMbKHR6LrfLw7tIoDMN_cg-zfw-ITPfM_JhS69QVPHXb2njwGO60nAQV\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=82016330&authType=name&authToken=RdpJ&trk=api*a3524211*s3596611*\";}}i:9;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:Vf1S\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/SxcpY0yNz5\";}s:9:\"firstName\";s:4:\"Erik\";s:8:\"headline\";s:33:\"VP of Talent Operations at Vungle\";s:2:\"id\";s:10:\"SxcpY0yNz5\";s:8:\"industry\";s:17:\"Computer Software\";s:8:\"lastName\";s:7:\"H. Juhl\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_fsPnUR-zuQtw_4e2TYz5UZnB2kL6TOe2DObdUZz61GA9Ysxu_y_sz4THGW5JGJWhaMleN0bTdnyg\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:102:\"http://www.linkedin.com/profile/view?id=843450&authType=name&authToken=Vf1S&trk=api*a3524211*s3596611*\";}}i:10;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:QQ9U\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/MEw_DzjR0y\";}s:9:\"firstName\";s:17:\"Barbara Jane (BJ)\";s:8:\"headline\";s:25:\"Co-Founder at co~luminate\";s:2:\"id\";s:10:\"MEw_DzjR0y\";s:8:\"industry\";s:28:\"Health, Wellness and Fitness\";s:8:\"lastName\";s:12:\"Harden Jones\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:30:\"Asheville, North Carolina Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_mB1VmUX_DjCzlMqwuvh5m4qi7yQ5Pxvw2KF5m4v_KVtvuRCIGli9hZ3STl6srZNb7NAXTxbLt_PO\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=65979991&authType=name&authToken=QQ9U&trk=api*a3524211*s3596611*\";}}i:11;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:DOC8\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/GjVlyCNdD6\";}s:9:\"firstName\";s:4:\"Jeff\";s:8:\"headline\";s:28:\"Systems Manager at CCPI, Inc\";s:2:\"id\";s:10:\"GjVlyCNdD6\";s:8:\"industry\";s:11:\"Photography\";s:8:\"lastName\";s:6:\"Harvey\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"Norfolk, Virginia Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_V24ZqLsHWCw3HIoyNHdFqbwFI8aSoDUyZD2FqQEzq5VgzWupnoHNs6ORLamtWosKRfVQR3q8ytQv\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=131574885&authType=name&authToken=DOC8&trk=api*a3524211*s3596611*\";}}i:12;O:8:\"stdClass\":3:{s:9:\"firstName\";s:7:\"private\";s:2:\"id\";s:7:\"private\";s:8:\"lastName\";s:7:\"private\";}i:13;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:R2ph\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/4ENkFY9NS0\";}s:9:\"firstName\";s:6:\"Daniel\";s:8:\"headline\";s:18:\"CEO at Three Rings\";s:2:\"id\";s:10:\"4ENkFY9NS0\";s:8:\"industry\";s:14:\"Computer Games\";s:8:\"lastName\";s:5:\"James\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_SEVdfpeBb4ldwe_Xf2JnfxEQbp9XIm-XfHanfxsBZJGqqoLk3uoLT0aMWtnReW1HuW4ch4ep7ubF\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:101:\"http://www.linkedin.com/profile/view?id=45839&authType=name&authToken=R2ph&trk=api*a3524211*s3596611*\";}}i:14;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:7kQQ\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/5wY5wOdJTM\";}s:9:\"firstName\";s:4:\"Gwen\";s:8:\"headline\";s:18:\"Owner, Ace Mailing\";s:2:\"id\";s:10:\"5wY5wOdJTM\";s:8:\"industry\";s:25:\"Marketing and Advertising\";s:8:\"lastName\";s:6:\"Kaplan\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_66VqguDawqoRsDnheTeFgaShINMBsmQhkkawgfy-qlSb5ol8Eho417HpLVJeJWb2FL4oteGZwIEf\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=14405360&authType=name&authToken=7kQQ&trk=api*a3524211*s3596611*\";}}i:15;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:xrtz\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/LyCcRjk0m5\";}s:9:\"firstName\";s:5:\"Shirl\";s:8:\"headline\";s:119:\"CPA Firm l Tax Professionals l Small Businessl Accountant l QuickBooks Training l Business Consultant l Payroll l Taxes\";s:2:\"id\";s:10:\"LyCcRjk0m5\";s:8:\"industry\";s:10:\"Accounting\";s:8:\"lastName\";s:4:\"Matz\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:26:\"Cleveland/Akron, Ohio Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_-vl8EBByKe-grqmHy-K1Eqt-rwQPKlmHrN50EqACfmtC7zMeYPTuXN5uOL6S1n7X1nPY5PihE7HY\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:103:\"http://www.linkedin.com/profile/view?id=9417513&authType=name&authToken=xrtz&trk=api*a3524211*s3596611*\";}}i:16;O:8:\"stdClass\":8:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:pE1F\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/n3dRzgYhFV\";}s:9:\"firstName\";s:5:\"Abbas\";s:8:\"headline\";s:42:\"professor at City College of San Francisco\";s:2:\"id\";s:10:\"n3dRzgYhFV\";s:8:\"industry\";s:16:\"Higher Education\";s:8:\"lastName\";s:8:\"Moghtani\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=55133117&authType=name&authToken=pE1F&trk=api*a3524211*s3596611*\";}}i:17;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:s4Oe\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/_XS6r-e1Ud\";}s:9:\"firstName\";s:4:\"John\";s:8:\"headline\";s:19:\"Community Organizer\";s:2:\"id\";s:10:\"_XS6r-e1Ud\";s:8:\"industry\";s:27:\"Civic & Social Organization\";s:8:\"lastName\";s:5:\"Nulty\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_SLdsnxe2dCbdBWetDkodnjE8WTlkUWZtfXjLnpRpnk5NkD7-3iJn4y7-bfAU4mMYu6IkMUdAOMp6\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=58910416&authType=name&authToken=s4Oe&trk=api*a3524211*s3596611*\";}}i:18;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:k9c1\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/21CFMCbAGe\";}s:9:\"firstName\";s:7:\"Michael\";s:8:\"headline\";s:88:\"Housing Development Advisory Committee Member at St. Anthony\'s Foundation Senior Housing\";s:2:\"id\";s:10:\"21CFMCbAGe\";s:8:\"industry\";s:33:\"Nonprofit Organization Management\";s:8:\"lastName\";s:5:\"Nulty\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_uQ-Va4ZruYiXv4XEmh15aUe82JX6BgvEmX65asJ81Vr9eJCoh8G98VSmGlkJqsNQS5rX3jFf5YcI\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=41058832&authType=name&authToken=k9c1&trk=api*a3524211*s3596611*\";}}i:19;O:8:\"stdClass\":8:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:h0Ej\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/BfBQEooOSm\";}s:9:\"firstName\";s:5:\"roark\";s:8:\"headline\";s:24:\"Equitaire Associates Inc\";s:2:\"id\";s:10:\"BfBQEooOSm\";s:8:\"industry\";s:11:\"Real Estate\";s:8:\"lastName\";s:7:\"o\'neill\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=91243315&authType=name&authToken=h0Ej&trk=api*a3524211*s3596611*\";}}i:20;O:8:\"stdClass\":8:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:JUFt\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/RdubDVTZ3H\";}s:9:\"firstName\";s:5:\"Turan\";s:8:\"headline\";s:38:\"Attended City College of San Francisco\";s:2:\"id\";s:10:\"RdubDVTZ3H\";s:8:\"industry\";s:17:\"Computer Software\";s:8:\"lastName\";s:7:\"Ozdemir\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=310535176&authType=name&authToken=JUFt&trk=api*a3524211*s3596611*\";}}i:21;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:m-hJ\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/GCAYfspJpJ\";}s:9:\"firstName\";s:7:\"Matthew\";s:8:\"headline\";s:88:\"Marketing Coordinator at The Plan Sponsor University & The Retirement Advisor University\";s:2:\"id\";s:10:\"GCAYfspJpJ\";s:8:\"industry\";s:35:\"Information Technology and Services\";s:8:\"lastName\";s:4:\"Pasa\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:29:\"West Palm Beach, Florida Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_fjdmjjFHN-iwuQ3TfOVljxFdNcnoaLATDxjAjY5VwqCVAT63_RJCPOAqsx9zSGrSaOIK-JBzwRMs\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=115565195&authType=name&authToken=m-hJ&trk=api*a3524211*s3596611*\";}}i:22;O:8:\"stdClass\":8:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:Ee1-\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/lvhcT69x5x\";}s:9:\"firstName\";s:5:\"Nancy\";s:8:\"headline\";s:19:\"Technical Recruiter\";s:2:\"id\";s:10:\"lvhcT69x5x\";s:8:\"industry\";s:19:\"Computer Networking\";s:8:\"lastName\";s:4:\"Pham\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=309602623&authType=name&authToken=Ee1-&trk=api*a3524211*s3596611*\";}}i:23;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:M6aD\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/LH_2_oVwBs\";}s:9:\"firstName\";s:3:\"Amy\";s:8:\"headline\";s:32:\"Production Manager/Editor/Artist\";s:2:\"id\";s:10:\"LH_2_oVwBs\";s:8:\"industry\";s:10:\"Publishing\";s:8:\"lastName\";s:8:\"Popovich\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_ZSvRnLoL2kRfW4sYZozknbZbuGD7WORYsETknbWvPkJxns2Oqw5c4FjUCfSKoJVtMmBLMhR1JJpM\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=40729020&authType=name&authToken=M6aD&trk=api*a3524211*s3596611*\";}}i:24;O:8:\"stdClass\":3:{s:9:\"firstName\";s:7:\"private\";s:2:\"id\";s:7:\"private\";s:8:\"lastName\";s:7:\"private\";}i:25;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:b1e2\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/HdNwABz2tJ\";}s:9:\"firstName\";s:8:\"Veronika\";s:8:\"headline\";s:39:\"Founder and CEO at The Empowerment Plan\";s:2:\"id\";s:10:\"HdNwABz2tJ\";s:8:\"industry\";s:6:\"Design\";s:8:\"lastName\";s:5:\"Scott\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:20:\"Greater Detroit Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_tm_nI17VhHLxk4dFrui5IlSs2IcOX4eFpoBdIlao1aifRyxbOePs5AsXG5Bhb0WIPSTeX9r0f4vY\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=55388018&authType=name&authToken=b1e2&trk=api*a3524211*s3596611*\";}}i:26;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:qRPg\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/IwInYgRZc9\";}s:9:\"firstName\";s:6:\"Silver\";s:8:\"headline\";s:34:\"Founder and CEO at Veret Media LLC\";s:2:\"id\";s:10:\"IwInYgRZc9\";s:8:\"industry\";s:25:\"Marketing and Advertising\";s:8:\"lastName\";s:8:\"Stoltsen\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_DBwsjMbYe-lz0wkDDrELjVvGoAb50wND7KxLjVvYzqPvhf_STlUnPs3KXxFsyuv32NWk-gbEwD7O\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=16501233&authType=name&authToken=qRPg&trk=api*a3524211*s3596611*\";}}i:27;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:Wdmr\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/F6-s6cW1Fi\";}s:9:\"firstName\";s:6:\"Rafael\";s:8:\"headline\";s:35:\"Sales Representative at UBM TechWeb\";s:2:\"id\";s:10:\"F6-s6cW1Fi\";s:8:\"industry\";s:12:\"Online Media\";s:8:\"lastName\";s:6:\"Vallin\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_cCVuh_j79xRj4bizviy1hh7l9OO0ZGtzz6a1hhaldZofbQ5vUko8m8sx41YhRLPJ9T4tfbpsCpVv\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:105:\"http://www.linkedin.com/profile/view?id=109714642&authType=name&authToken=Wdmr&trk=api*a3524211*s3596611*\";}}i:28;O:8:\"stdClass\":9:{s:25:\"apiStandardProfileRequest\";O:8:\"stdClass\":2:{s:7:\"headers\";O:8:\"stdClass\":2:{s:6:\"_total\";i:1;s:6:\"values\";a:1:{i:0;O:8:\"stdClass\":2:{s:4:\"name\";s:15:\"x-li-auth-token\";s:5:\"value\";s:9:\"name:10Dr\";}}}s:3:\"url\";s:44:\"http://api.linkedin.com/v1/people/HXrv85gyCH\";}s:9:\"firstName\";s:3:\"Edo\";s:8:\"headline\";s:36:\"Product Manager at Intel Corporation\";s:2:\"id\";s:10:\"HXrv85gyCH\";s:8:\"industry\";s:7:\"Banking\";s:8:\"lastName\";s:8:\"Williams\";s:8:\"location\";O:8:\"stdClass\":2:{s:7:\"country\";O:8:\"stdClass\":1:{s:4:\"code\";s:2:\"us\";}s:4:\"name\";s:22:\"San Francisco Bay Area\";}s:10:\"pictureUrl\";s:113:\"http://m.c.lnkd.licdn.com/mpr/mprx/0_O-y3pnqPBN_u0h87OAgOpznrzBLm1_37yzeYpqbGotAY2F9ftquDtN12RJ5lKkh_0AY01PMLjkxE\";s:26:\"siteStandardProfileRequest\";O:8:\"stdClass\":1:{s:3:\"url\";s:104:\"http://www.linkedin.com/profile/view?id=24260594&authType=name&authToken=10Dr&trk=api*a3524211*s3596611*\";}}}}',67);
/*!40000 ALTER TABLE `LinkedIn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `object_type` varchar(20) NOT NULL,
  `object_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `action_taken` varchar(20) NOT NULL,
  `object_title` varchar(100) NOT NULL,
  `linked_object_type` varchar(20) NOT NULL,
  `linked_object_id` int(11) NOT NULL,
  `linked_object_title` varchar(100) NOT NULL,
  `activity_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,1,1,'message',1,1,'posted','New data','deal',1,'Sample Deal',1381476076),(2,1,1,'file',1,1,'uploaded','Picture_2.jpg','',0,'',1381476168),(3,1,1,'file',2,1,'uploaded','About Stacks.pdf','',0,'',1381476183),(4,1,1,'proposal',1,1,'created','#201000','',0,'',1381476192),(5,1,1,'proposal',1,1,'deleted','201000','',0,'',1381476233),(6,1,1,'task',1,3,'created','task by testadmin','',0,'',1381476536),(7,1,1,'message',2,3,'posted','Am here','deal',1,'Sample Deal',1381476555),(8,1,1,'proposal',2,3,'created','#201000','',0,'',1381476631),(9,1,1,'proposal',2,3,'updated','#201000','',0,'',1381476671),(10,1,1,'proposal',2,3,'updated','#201000','',0,'',1381476700),(11,1,1,'proposal',3,1,'created','#201001','',0,'',1386621647),(12,1,1,'proposal',3,1,'updated','#201001','',0,'',1386621668),(13,1,1,'proposal',3,1,'deleted','201001','',0,'',1386621676),(14,1,1,'proposal',4,1,'created','#201001','',0,'',1386621678),(15,1,1,'proposal',4,1,'deleted','201001','',0,'',1386621718),(16,1,1,'deal',1,1,'updated','The due date on Sample Deal has been decreased by 535 days','',0,'',1386621865),(17,1,1,'deal',1,0,'Status change on','The status on Sample Deal changed to overdue','',0,'',1386621865),(18,1,1,'deal',1,1,'updated','The due date on Sample Deal has been increased by 430 days','',0,'',1386622372),(19,1,1,'deal',1,0,'Status change on','The status on Sample Deal changed to on-schedule','',0,'',1386622372),(20,1,1,'deal',1,0,'Status change on','The status on Sample Deal changed to on-schedule','',0,'',1386622372),(21,1,1,'task',2,1,'created','new','',0,'',1386622434),(22,1,1,'deal',1,1,'updated','The due date on Sample Deal has been increased by 1 day','',0,'',1387783279),(23,1,1,'message',3,1,'posted','proposal test comment','proposal',2,'',1387783382),(24,1,1,'task',3,1,'created','testing new task','',0,'',1387786124),(25,1,1,'message',4,1,'posted','klsjdf lkjfds','proposal',2,'',1387786177),(26,4,1,'deal',4,0,'Status change on','The status on Used Cars changed to not-started','',0,'',1387923214),(27,4,1,'proposal',3,1,'created','#201001','',0,'',1387925202),(28,4,1,'proposal',3,1,'updated','#201001','',0,'',1387925232),(29,1,1,'proposal',4,1,'created','#201002','',0,'',1388005138),(30,1,1,'proposal',4,1,'updated','#201002','',0,'',1388005153),(31,4,1,'task',4,1,'created','test spark plugs','',0,'',1388005829),(32,4,1,'deal',4,0,'Status change on','The status on Used Cars changed to complete','',0,'',1388005829),(33,4,1,'deal',4,0,'Status change on','The status on Used Cars changed to behind-schedule','',0,'',1388005829),(34,4,1,'proposal',5,1,'created','#201003','',0,'',1388109540),(35,4,1,'deal',4,0,'Status change on','The status on Used Cars changed to overdue','',0,'',1388176894),(36,5,4,'deal',5,0,'Status change on','The status on dsafdfd changed to not-started','',0,'',1388871166);
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(400) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address1` varchar(100) NOT NULL,
  `address2` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `website` varchar(50) NOT NULL,
  `primary_contact_id` int(11) NOT NULL,
  `is_archived` tinyint(4) NOT NULL,
  `creator_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Sample Client','client@example.com','123 Fern St','Atlanta GA','111-111-1111','www.google.com',67,0,NULL),(2,'john doe','','123 Main St','#3','415-555-1212','http://www.google.com',0,0,NULL),(3,'michael','','','','','',0,0,NULL),(4,'peter piper','','','','','',0,0,NULL),(28,'mike&#039;s acme parts client','jsteiner@jkglsf.com','','','','',0,0,67),(29,'free form inc','psmith@jklglds.com','123 Main St','#3','415-555-1212','http://www.google.com',0,0,67),(34,'startup shabang','shslsjf@ljldj.co','','','','',0,0,67),(35,'test movie demo','mdemo@movie.com','','','','',0,0,67),(36,'testing','lksdjf@lkfdsjf.com','','','','',0,0,1),(37,'uoiu','oieuer@uioesuroieur.com','','','','',0,0,1);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deal_notes`
--

DROP TABLE IF EXISTS `deal_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deal_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) NOT NULL,
  `notes` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deal_notes`
--

LOCK TABLES `deal_notes` WRITE;
/*!40000 ALTER TABLE `deal_notes` DISABLE KEYS */;
INSERT INTO `deal_notes` VALUES (1,1,'&lt;p&gt;test&lt;/p&gt;');
/*!40000 ALTER TABLE `deal_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deals`
--

DROP TABLE IF EXISTS `deals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(400) NOT NULL,
  `client_id` int(11) NOT NULL,
  `start_date` int(11) NOT NULL,
  `due_date` int(11) DEFAULT NULL,
  `progress` int(11) NOT NULL,
  `expected_progress` int(11) NOT NULL,
  `file_folder` varchar(50) NOT NULL,
  `status_text` varchar(20) NOT NULL,
  `created_date` int(11) NOT NULL,
  `is_archived` tinyint(4) NOT NULL,
  `is_template` tinyint(4) NOT NULL DEFAULT '0',
  `creator_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deals`
--

LOCK TABLES `deals` WRITE;
/*!40000 ALTER TABLE `deals` DISABLE KEYS */;
INSERT INTO `deals` VALUES (1,'Sample Deal',1,1386576000,1423814400,0,8,'sample-deal-f50b262301fddc6f59f4eca07cdf57e0f7f','on-schedule',0,0,0,NULL),(2,'Template',1,1381820400,1381820400,100,0,'','',1381871059,0,1,NULL),(3,'Another Template',1,1381820400,1381820400,100,0,'','',1381871086,0,1,NULL),(4,'Used Cars',1,1387872000,1388131200,0,100,'','overdue',1387923214,0,0,NULL),(5,'dsafdfd',4,1388822400,1391760000,100,31,'','not-started',1388871165,0,0,NULL);
/*!40000 ALTER TABLE `deals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debugger`
--

DROP TABLE IF EXISTS `debugger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `debugger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(400) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=454 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debugger`
--

LOCK TABLES `debugger` WRITE;
/*!40000 ALTER TABLE `debugger` DISABLE KEYS */;
INSERT INTO `debugger` VALUES (425,''),(426,' - '),(427,'85 - '),(428,'86 - '),(429,'87 - '),(430,'88 - 1'),(431,'89 - 1'),(432,'get in core/model '),(433,'get in core/model '),(434,'admin'),(435,'admin'),(436,'admin'),(437,'admin'),(438,'get in core/model '),(439,'get in core/model '),(440,'get in core/model '),(441,'admin'),(442,'admin'),(443,'admin'),(444,'admin'),(445,'get in core/model '),(446,'admin'),(447,'admin'),(448,'admin'),(449,'admin'),(450,'get in core/model '),(451,'get in core/model '),(452,'get in core/model '),(453,'get in core/model ');
/*!40000 ALTER TABLE `debugger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `uploader_id` int(11) NOT NULL,
  `deal_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `entity_type` mediumtext,
  `entity_id` int(11) DEFAULT NULL,
  `notes` mediumtext NOT NULL,
  `type` varchar(10) NOT NULL,
  `size` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `is_archived` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,'Picture_2.jpg',1,1,1,NULL,NULL,'','',312903,1381476168,0),(2,'About Stacks.pdf',1,1,1,NULL,NULL,'','',303444,1381476183,0);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` mediumtext NOT NULL,
  `user_id` int(11) NOT NULL,
  `reference_object` varchar(15) NOT NULL,
  `reference_id` int(11) NOT NULL,
  `deal_id` int(11) DEFAULT NULL,
  `client_id` int(11) NOT NULL,
  `is_read` tinyint(1) NOT NULL,
  `created_date` int(11) NOT NULL,
  `is_archived` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'New data',1,'deal',1,1,1,0,1381476076,0),(2,'Am here',3,'deal',1,1,1,0,1381476555,0),(3,'proposal test comment',1,'proposal',2,1,1,0,1387783382,0),(4,'klsjdf lkjfds',1,'proposal',2,1,1,0,1387786177,0);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proposal_id` int(11) DEFAULT NULL,
  `client_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` mediumtext NOT NULL,
  `payment_method` varchar(20) DEFAULT NULL,
  `payment_processor_charge_id` varchar(30) NOT NULL,
  `reference_code` varchar(20) NOT NULL,
  `payment_date` int(11) NOT NULL,
  `is_archived` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proposal_items`
--

DROP TABLE IF EXISTS `proposal_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proposal_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proposal_id` int(11) DEFAULT NULL,
  `item` mediumtext NOT NULL,
  `quantity` float NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `task_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proposal_items`
--

LOCK TABLES `proposal_items` WRITE;
/*!40000 ALTER TABLE `proposal_items` DISABLE KEYS */;
INSERT INTO `proposal_items` VALUES (1,2,'New Item',100,'10.00','1000.00',NULL),(2,3,'sdfafsdf',3,'3.00','9.00',NULL);
/*!40000 ALTER TABLE `proposal_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proposals`
--

DROP TABLE IF EXISTS `proposals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `proposals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `deal_id` int(11) NOT NULL,
  `number` varchar(20) NOT NULL,
  `date` int(11) NOT NULL,
  `tax_rate` decimal(10,2) DEFAULT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `tax` decimal(10,2) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `payments` decimal(10,2) NOT NULL,
  `balance` decimal(10,2) NOT NULL,
  `due_date` int(11) NOT NULL,
  `date_sent` int(11) NOT NULL,
  `num_times_sent` int(11) NOT NULL,
  `status_text` varchar(20) NOT NULL,
  `is_paid` tinyint(4) NOT NULL,
  `is_overdue` tinyint(4) NOT NULL,
  `payment_submitted_date` int(11) NOT NULL,
  `is_payment_completed` tinyint(4) NOT NULL,
  `is_archived` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proposals`
--

LOCK TABLES `proposals` WRITE;
/*!40000 ALTER TABLE `proposals` DISABLE KEYS */;
INSERT INTO `proposals` VALUES (2,1,1,'201000',1387958400,'0.01','1000.00','10.00','1010.00','0.00','1010.00',1381518000,1381476738,1,'Overdue',0,1,0,0,0),(3,1,4,'201001',1387886400,'0.01','9.00','0.09','9.09','0.00','9.09',1388131200,0,0,'Overdue',0,1,0,0,0),(4,1,1,'201002',1387972800,'0.01','0.00','0.00','0.00','0.00','0.00',1387972800,0,0,'Inactive',0,0,0,0,0),(5,1,4,'201003',1388145600,'0.01','0.00','0.00','0.00','0.00','0.00',1388145600,0,0,'Inactive',0,0,0,0,0);
/*!40000 ALTER TABLE `proposals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,1,1,0),(2,3,1,1381475839),(3,22,2,1388194581),(4,42,3,1388200732),(5,43,3,1388200782),(6,51,3,1388207151),(7,52,3,1388207191),(8,53,3,1388207583),(9,54,3,1388208750),(10,55,3,1388208975),(11,56,3,1388209305),(12,57,3,1388209425),(13,58,3,1388257855),(14,59,3,1388280827),(15,60,3,1388283072),(16,61,3,1388283342),(17,62,3,1388283934),(18,63,3,1388284487),(19,64,2,1388287897),(20,65,3,1388291582),(21,66,3,1388292194),(22,67,3,1388356404),(23,68,2,1388446306),(24,69,2,1388466794),(25,70,2,1388869826),(26,71,2,1388870753),(27,72,2,1388871090),(28,73,2,1388872626),(29,74,2,1388872908),(30,75,2,1388872958),(31,76,2,1388874381),(32,77,2,1389374684),(33,78,2,1389728464),(34,79,2,1389733359),(35,80,2,1389734067),(36,81,2,1389744973),(37,82,2,1389745076),(38,83,2,1389745377),(39,84,2,1389745731),(40,85,2,1389745965),(41,86,2,1389746165),(42,87,2,1389748054),(43,88,2,1389748109),(44,89,2,1389748228),(45,90,2,1389748513),(46,91,2,1389749232);
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `created` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin',0),(2,'client',0),(3,'user',0),(4,'superadmin',0);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(40) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `ip_address` varchar(16) NOT NULL,
  `user_agent` varchar(50) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('de227a239b9007df4f5c784a0b70b895',1,'admin','::1','bef8ab52ade1826ae6dab4fa2976a3db',1381871221),('b06fd96bd770d5020d26e43fe19ecb81',1,'admin','::1','ec51a1ccb6bcf87a32ce8d233dc9ffce',1381562694),('ade0f429dc17732737f3fd591c4e3fd3',1,'admin','127.0.0.1','a6dedb6096973e4576e1dfc9d048075d',1386617539),('ce08a9b61e9d312f29279e243dbb4dc7',1,'admin','::1','a6dedb6096973e4576e1dfc9d048075d',1386622451),('bc5b5bcd9e05974a3aa3c5d653843182',1,'admin','::1','a6dedb6096973e4576e1dfc9d048075d',1386639782),('3e0bd8fe0ea6b135f9872269b8152637',1,'admin','::1','a6dedb6096973e4576e1dfc9d048075d',1386710282),('7d4274d4cd928fcfb4b39a8da0416740',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1387509934),('26c1c36187e6f35190b657b326807080',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1387778473),('b55715fb42931c63aebd05d78058e0c2',1,'admin','::1','8b7535adeddc223aa9c8b2b378cdf189',1387578432),('76f5b9d95fd9d81251a93788cd477aa7',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1387785151),('746615ef83356360949d3fed4635d5be',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1387786777),('371ed028e1b8cb97a137edbf52465fa6',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1388259872),('b45e73d03d2c809a7e6f9eb791a7651e',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1388259914),('b89bef81ec8ca991debbc4d6127b384b',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1388260074),('b5a419866c2688b38f6ee13590e8d424',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1388260159),('15f669e1029079ddd6d836c887d74ae6',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1388260294),('557baf825a6b84b3de7761f0e1bb6ea1',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1388261287),('3ce48b25493a15f69d782a8683dc272d',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1388261303),('cf74456c2306428b1b9d2e9e3c97fcf6',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1388261319),('a5a02bfc0561a6110414a604f4df4570',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1388261355),('099c6b8f49a9b6348573e57c811b707a',58,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388280732),('46a0853952a450b93caf5411429445b6',58,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388280732),('d46581c5f406283b31e516d82e5ed8c7',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1388281275),('4c26619be1fc8fe84a33d649497034a9',61,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388283345),('93c6a2da6f3cd420d8d4c02835bda2ed',62,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388283944),('dcf4ad6f8e1dede32af15b5cd1a74cac',62,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388284367),('7882cf43488db6c6cd3e6ba7dd7f10c6',63,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388284489),('265f740a4424bd26f843b775a4ce5761',63,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388284537),('5e84fcc614f8edc24c5c5946f48e4796',63,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388290658),('4fbec8a81c2e6a09065ada739582d565',63,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388284716),('b0cc7c2b08734d699a6f8c199af8a7e0',63,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388288208),('0588f5954dcada8b2b9728f63cd089ff',66,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388292197),('6d1bf8641c048e6d824afc9a5575a42e',66,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388298778),('9e71bcc3e680bad85178da104767faca',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388356407),('23fb86721751ec87e55ef8398b557146',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388454557),('9be4c7ce3e9901c4cd3689772ba7383c',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388356600),('6dd9e778d90946b095e7f99642725113',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388466841),('24ba2b308bae6b260796b1ab2516abed',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388705335),('1580f6f4bdb84e130e7b6a93a63dc673',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388709070),('81efd04eefa3fd1affcf4e6672a57fcb',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388784875),('b88989bf5393330b20904b94c8dcb33c',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388785106),('e6616372ba37a0f073590b7207993bfa',1,'admin','::1','8b7535adeddc223aa9c8b2b378cdf189',1388792711),('47a4ab49531a8d2236529fe671ca0432',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388792969),('4f62e4438e28aaff29bf3af5faa75634',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388887998),('8538729dc6bfe5e4afb5dacba518d287',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388792969),('e835e2ade4491dd3cff2bf91bafb4955',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388801469),('bd64553caf79fe64b818ae7b758b3c8f',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388801470),('b9cc0db1ad37794691ae919af4228045',1,'admin','::1','8b7535adeddc223aa9c8b2b378cdf189',1388874836),('f243ccdf0db7feb77a3de496d750ef51',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1388966693),('d8376e046fc644841607b32064d77e8f',1,'admin','::1','8b7535adeddc223aa9c8b2b378cdf189',1388888815),('3e3120e4db1c7ec12d898c20583555f2',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1389051149),('64663cfab3b4893c81d55373ad3960fd',67,'mmccarr1@mail.ccsf.edu','::1','2eafc93727dd7cbb81746b9535cba76f',1389219644),('659daccd4be8ce2a08ad567719a8b582',1,'admin','::1','8b7535adeddc223aa9c8b2b378cdf189',1389219624),('62273108b5bdcfbfb0773c6a4af8012c',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1389375457),('b68850b6adf8f07d2f38ef78d6096b06',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1389749348);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `section` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `value` varchar(1000) NOT NULL,
  `type` varchar(10) NOT NULL,
  `description` text NOT NULL,
  `default_value` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `task` mediumtext NOT NULL,
  `notes` mediumtext NOT NULL,
  `deal_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `is_complete` tinyint(1) NOT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `order` int(11) NOT NULL,
  `due_date` int(11) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `status_text` varchar(20) DEFAULT NULL,
  `is_overdue` tinyint(4) NOT NULL,
  `is_section` tinyint(4) NOT NULL,
  `is_proposald` tinyint(4) DEFAULT NULL,
  `proposal_id` int(11) DEFAULT NULL,
  `completed_by` int(11) NOT NULL,
  `completed_date` int(11) DEFAULT NULL,
  `created_date` int(11) NOT NULL,
  `total_time` int(11) NOT NULL,
  `modified_date` int(11) NOT NULL,
  `is_archived` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'task by testadmin','',1,1,0,3,3,0,NULL,52,NULL,0,0,0,NULL,0,NULL,1381476536,36302,0,0),(2,'new','none',1,1,0,3,1,0,1386576000,NULL,'Overdue',1,0,0,NULL,0,NULL,1386622434,0,0,0),(3,'testing new task','jsfdlk jdklsfj dlkfjds',1,1,0,3,1,0,1387958400,NULL,'Overdue',1,0,NULL,NULL,0,NULL,1387786124,0,0,0),(4,'test spark plugs','may need to pull all spark plugs out',4,1,0,3,1,0,1389340800,NULL,'Overdue',1,0,NULL,NULL,0,NULL,1388005829,0,0,0);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time_entries`
--

DROP TABLE IF EXISTS `time_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `time_entries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_entries`
--

LOCK TABLES `time_entries` WRITE;
/*!40000 ALTER TABLE `time_entries` DISABLE KEYS */;
INSERT INTO `time_entries` VALUES (1,36300,1,1,1386621780),(2,2,1,1,1386621786);
/*!40000 ALTER TABLE `time_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) DEFAULT NULL,
  `first_name` varchar(400) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address1` varchar(100) NOT NULL,
  `address2` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `temp_password` varchar(10) NOT NULL,
  `creator_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,0,'Sample','Admin','admin','','','','42e8e8061bd17e8d1b5b7220251d0d396a1250d962796199050307107f85b2e7','312ffb9033bc186578bc085954a7894df47f591a7f760c69df35ff878a8006a9','',NULL),(2,1,'Sample','User','sample@example.com','123 Fern St','Atlanta GA','111-111-1111','','','',NULL),(3,2,'TestAdmin','TestAdmin','TestAdmin','','','','42e8e8061bd17e8d1b5b7220251d0d396a1250d962796199050307107f85b2e7','312ffb9033bc186578bc085954a7894df47f591a7f760c69df35ff878a8006a9','',NULL),(67,1,'mike','mccarron','mmccarr1@mail.ccsf.edu','','','','628b5cc6cc81ab55ccb398cc4d36082e04e4d6f3d6265c561eca5f10cd93126e','4db7c07461bf745ba9cd0bea23f9221632366c858133c7dbe3ae2a05c0a7fdd0','',NULL),(68,4,'peter','piper','p.piper@jdljfd.com','','','','fb039554f9aa41c72e005bc8061b4eead0b0c3547233fcec85c1fd31335ab4dd','ffe4b0aee9325c9a35f5f85107d21b9733cf16408901a2ab531ce0818b4696f0','fb039554f9',NULL),(90,29,'mikefreeform','testclientusercreation','jslkfjdfoiewjr@ljdlfoew.com','','','','2290d82a4a691975225673c8cef7314e6f77eaa02678992ce3df78423162fe2a','d49c32a95e3b9f7d89bf29f613b4ab463eab8829d1014ed14f0234f5ec4f42e7','2290d82a4a',1),(91,1,'john','smith','js@jdsflkjd.com','','','','fc65ba6f33b2beaf5395c94942ef7ef880bcbc400ae56106386863303fb277df','410b7715f241d2c2644ea2fc16fafb70c607ff9e718e76e9d523c99ca6e99ed8','fc65ba6f33',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-01-14 17:29:49
