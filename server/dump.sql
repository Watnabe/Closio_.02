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
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES (1,1,1,'message',1,1,'posted','New data','deal',1,'Sample Deal',1381476076),(2,1,1,'file',1,1,'uploaded','Picture_2.jpg','',0,'',1381476168),(3,1,1,'file',2,1,'uploaded','About Stacks.pdf','',0,'',1381476183),(4,1,1,'proposal',1,1,'created','#201000','',0,'',1381476192),(5,1,1,'proposal',1,1,'deleted','201000','',0,'',1381476233),(6,1,1,'task',1,3,'created','task by testadmin','',0,'',1381476536),(7,1,1,'message',2,3,'posted','Am here','deal',1,'Sample Deal',1381476555),(8,1,1,'proposal',2,3,'created','#201000','',0,'',1381476631),(9,1,1,'proposal',2,3,'updated','#201000','',0,'',1381476671),(10,1,1,'proposal',2,3,'updated','#201000','',0,'',1381476700),(11,1,1,'proposal',3,1,'created','#201001','',0,'',1386621647),(12,1,1,'proposal',3,1,'updated','#201001','',0,'',1386621668),(13,1,1,'proposal',3,1,'deleted','201001','',0,'',1386621676),(14,1,1,'proposal',4,1,'created','#201001','',0,'',1386621678),(15,1,1,'proposal',4,1,'deleted','201001','',0,'',1386621718),(16,1,1,'deal',1,1,'updated','The due date on Sample Deal has been decreased by 535 days','',0,'',1386621865),(17,1,1,'deal',1,0,'Status change on','The status on Sample Deal changed to overdue','',0,'',1386621865),(18,1,1,'deal',1,1,'updated','The due date on Sample Deal has been increased by 430 days','',0,'',1386622372),(19,1,1,'deal',1,0,'Status change on','The status on Sample Deal changed to on-schedule','',0,'',1386622372),(20,1,1,'deal',1,0,'Status change on','The status on Sample Deal changed to on-schedule','',0,'',1386622372),(21,1,1,'task',2,1,'created','new','',0,'',1386622434),(22,1,1,'deal',1,1,'updated','The due date on Sample Deal has been increased by 1 day','',0,'',1387783279),(23,1,1,'message',3,1,'posted','proposal test comment','proposal',2,'',1387783382),(24,1,1,'task',3,1,'created','testing new task','',0,'',1387786124),(25,1,1,'message',4,1,'posted','klsjdf lkjfds','proposal',2,'',1387786177);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Sample Client','client@example.com','123 Fern St','Atlanta GA','111-111-1111','www.google.com',0,0);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deals`
--

LOCK TABLES `deals` WRITE;
/*!40000 ALTER TABLE `deals` DISABLE KEYS */;
INSERT INTO `deals` VALUES (1,'Sample Deal',1,1386576000,1423814400,0,3,'sample-deal-f50b262301fddc6f59f4eca07cdf57e0f7f','on-schedule',0,0,0),(2,'Template',1,1381820400,1381820400,100,0,'','',1381871059,0,1),(3,'Another Template',1,1381820400,1381820400,100,0,'','',1381871086,0,1);
/*!40000 ALTER TABLE `deals` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proposal_items`
--

LOCK TABLES `proposal_items` WRITE;
/*!40000 ALTER TABLE `proposal_items` DISABLE KEYS */;
INSERT INTO `proposal_items` VALUES (1,2,'New Item',100,'10.00','1000.00',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proposals`
--

LOCK TABLES `proposals` WRITE;
/*!40000 ALTER TABLE `proposals` DISABLE KEYS */;
INSERT INTO `proposals` VALUES (2,1,1,'201000',1387958400,'0.01','1000.00','10.00','1010.00','0.00','1010.00',1381518000,1381476738,1,'proposal.status_over',0,1,0,0,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,1,1,0),(2,3,1,1381475839);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin',0),(2,'client',0);
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
INSERT INTO `sessions` VALUES ('de227a239b9007df4f5c784a0b70b895',1,'admin','::1','bef8ab52ade1826ae6dab4fa2976a3db',1381871221),('b06fd96bd770d5020d26e43fe19ecb81',1,'admin','::1','ec51a1ccb6bcf87a32ce8d233dc9ffce',1381562694),('ade0f429dc17732737f3fd591c4e3fd3',1,'admin','127.0.0.1','a6dedb6096973e4576e1dfc9d048075d',1386617539),('ce08a9b61e9d312f29279e243dbb4dc7',1,'admin','::1','a6dedb6096973e4576e1dfc9d048075d',1386622451),('bc5b5bcd9e05974a3aa3c5d653843182',1,'admin','::1','a6dedb6096973e4576e1dfc9d048075d',1386639782),('3e0bd8fe0ea6b135f9872269b8152637',1,'admin','::1','a6dedb6096973e4576e1dfc9d048075d',1386710282),('7d4274d4cd928fcfb4b39a8da0416740',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1387509934),('26c1c36187e6f35190b657b326807080',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1387778473),('b55715fb42931c63aebd05d78058e0c2',1,'admin','::1','8b7535adeddc223aa9c8b2b378cdf189',1387578432),('76f5b9d95fd9d81251a93788cd477aa7',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1387785151),('746615ef83356360949d3fed4635d5be',1,'admin','::1','2eafc93727dd7cbb81746b9535cba76f',1387786777);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,'task by testadmin','',1,1,0,3,3,0,NULL,52,NULL,0,0,0,NULL,0,NULL,1381476536,36302,0,0),(2,'new','none',1,1,0,3,1,0,1386576000,NULL,'Overdue',1,0,0,NULL,0,NULL,1386622434,0,0,0),(3,'testing new task','jsfdlk jdklsfj dlkfjds',1,1,0,3,1,0,1387958400,NULL,'On Schedule',0,0,NULL,NULL,0,NULL,1387786124,0,0,0);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,0,'Sample','Admin','admin','','','','42e8e8061bd17e8d1b5b7220251d0d396a1250d962796199050307107f85b2e7','312ffb9033bc186578bc085954a7894df47f591a7f760c69df35ff878a8006a9',''),(2,1,'Sample','User','sample@example.com','123 Fern St','Atlanta GA','111-111-1111','','',''),(3,2,'TestAdmin','TestAdmin','TestAdmin','','','','42e8e8061bd17e8d1b5b7220251d0d396a1250d962796199050307107f85b2e7','312ffb9033bc186578bc085954a7894df47f591a7f760c69df35ff878a8006a9','');
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

-- Dump completed on 2013-12-23  0:22:57


CREATE TABLE `debugger` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(400) NOT NULL,
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;


CREATE TABLE `LinkedIn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` text NOT NULL,
`email` varchar(155) NOT NULL,
`connections` text NOT NULL,
 
  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
