-- phpMyAdmin SQL Dump
-- version 3.3.9.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 10, 2013 at 01:44 PM
-- Server version: 5.5.9
-- PHP Version: 5.3.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Database: `closioSPA`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=22 ;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` VALUES(1, 1, 1, 'message', 1, 1, 'posted', 'New data', 'deal', 1, 'Sample Deal', 1381476076);
INSERT INTO `activity` VALUES(2, 1, 1, 'file', 1, 1, 'uploaded', 'Picture_2.jpg', '', 0, '', 1381476168);
INSERT INTO `activity` VALUES(3, 1, 1, 'file', 2, 1, 'uploaded', 'About Stacks.pdf', '', 0, '', 1381476183);
INSERT INTO `activity` VALUES(4, 1, 1, 'proposal', 1, 1, 'created', '#201000', '', 0, '', 1381476192);
INSERT INTO `activity` VALUES(5, 1, 1, 'proposal', 1, 1, 'deleted', '201000', '', 0, '', 1381476233);
INSERT INTO `activity` VALUES(6, 1, 1, 'task', 1, 3, 'created', 'task by testadmin', '', 0, '', 1381476536);
INSERT INTO `activity` VALUES(7, 1, 1, 'message', 2, 3, 'posted', 'Am here', 'deal', 1, 'Sample Deal', 1381476555);
INSERT INTO `activity` VALUES(8, 1, 1, 'proposal', 2, 3, 'created', '#201000', '', 0, '', 1381476631);
INSERT INTO `activity` VALUES(9, 1, 1, 'proposal', 2, 3, 'updated', '#201000', '', 0, '', 1381476671);
INSERT INTO `activity` VALUES(10, 1, 1, 'proposal', 2, 3, 'updated', '#201000', '', 0, '', 1381476700);
INSERT INTO `activity` VALUES(11, 1, 1, 'proposal', 3, 1, 'created', '#201001', '', 0, '', 1386621647);
INSERT INTO `activity` VALUES(12, 1, 1, 'proposal', 3, 1, 'updated', '#201001', '', 0, '', 1386621668);
INSERT INTO `activity` VALUES(13, 1, 1, 'proposal', 3, 1, 'deleted', '201001', '', 0, '', 1386621676);
INSERT INTO `activity` VALUES(14, 1, 1, 'proposal', 4, 1, 'created', '#201001', '', 0, '', 1386621678);
INSERT INTO `activity` VALUES(15, 1, 1, 'proposal', 4, 1, 'deleted', '201001', '', 0, '', 1386621718);
INSERT INTO `activity` VALUES(16, 1, 1, 'deal', 1, 1, 'updated', 'The due date on Sample Deal has been decreased by 535 days', '', 0, '', 1386621865);
INSERT INTO `activity` VALUES(17, 1, 1, 'deal', 1, 0, 'Status change on', 'The status on Sample Deal changed to overdue', '', 0, '', 1386621865);
INSERT INTO `activity` VALUES(18, 1, 1, 'deal', 1, 1, 'updated', 'The due date on Sample Deal has been increased by 430 days', '', 0, '', 1386622372);
INSERT INTO `activity` VALUES(19, 1, 1, 'deal', 1, 0, 'Status change on', 'The status on Sample Deal changed to on-schedule', '', 0, '', 1386622372);
INSERT INTO `activity` VALUES(20, 1, 1, 'deal', 1, 0, 'Status change on', 'The status on Sample Deal changed to on-schedule', '', 0, '', 1386622372);
INSERT INTO `activity` VALUES(21, 1, 1, 'task', 2, 1, 'created', 'new', '', 0, '', 1386622434);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` VALUES(1, 'Sample Client', 'client@example.com', '123 Fern St', 'Atlanta GA', '111-111-1111', 'www.google.com', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `files`
--

INSERT INTO `files` VALUES(1, 'Picture_2.jpg', 1, 1, 1, NULL, NULL, '', '', 312903, 1381476168, 0);
INSERT INTO `files` VALUES(2, 'About Stacks.pdf', 1, 1, 1, NULL, NULL, '', '', 303444, 1381476183, 0);

-- --------------------------------------------------------

--
-- Table structure for table `proposals`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `proposals`
--

INSERT INTO `proposals` VALUES(2, 1, 1, '201000', 1381518000, 0.01, 1000.00, 10.00, 1010.00, 0.00, 1010.00, 1381518000, 1381476738, 1, 'Overdue', 0, 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `proposal_items`
--

CREATE TABLE `proposal_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proposal_id` int(11) NOT NULL,
  `item` mediumtext NOT NULL,
  `quantity` float NOT NULL,
  `rate` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `task_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `proposal_items`
--

INSERT INTO `proposal_items` VALUES(1, 2, 'New Item', 100, 10.00, 1000.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` VALUES(1, 'New data', 1, 'deal', 1, 1, 1, 0, 1381476076, 0);
INSERT INTO `messages` VALUES(2, 'Am here', 3, 'deal', 1, 1, 1, 0, 1381476555, 0);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proposal_id` int(11) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `payments`
--


-- --------------------------------------------------------

--
-- Table structure for table `deals`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `deals`
--

INSERT INTO `deals` VALUES(1, 'Sample Deal', 1, 1386576000, 1423728000, 0, 0, 'sample-deal-f50b262301fddc6f59f4eca07cdf57e0f7f', 'on-schedule', 0, 0, 0);
INSERT INTO `deals` VALUES(2, 'Template', 1, 1381820400, 1381820400, 100, 0, '', '', 1381871059, 0, 1);
INSERT INTO `deals` VALUES(3, 'Another Template', 1, 1381820400, 1381820400, 100, 0, '', '', 1381871086, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `deal_notes`
--

CREATE TABLE `deal_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deal_id` int(11) NOT NULL,
  `notes` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `deal_notes`
--

INSERT INTO `deal_notes` VALUES(1, 1, '&lt;p&gt;test&lt;/p&gt;');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `created` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` VALUES(1, 'admin', 0);
INSERT INTO `roles` VALUES(2, 'client', 0);

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` VALUES(1, 1, 1, 0);
INSERT INTO `role_user` VALUES(2, 3, 1, 1381475839);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(40) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `ip_address` varchar(16) NOT NULL,
  `user_agent` varchar(50) NOT NULL,
  `last_activity` int(10) unsigned NOT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` VALUES('de227a239b9007df4f5c784a0b70b895', 1, 'admin', '::1', 'bef8ab52ade1826ae6dab4fa2976a3db', 1381871221);
INSERT INTO `sessions` VALUES('b06fd96bd770d5020d26e43fe19ecb81', 1, 'admin', '::1', 'ec51a1ccb6bcf87a32ce8d233dc9ffce', 1381562694);
INSERT INTO `sessions` VALUES('ade0f429dc17732737f3fd591c4e3fd3', 1, 'admin', '127.0.0.1', 'a6dedb6096973e4576e1dfc9d048075d', 1386617539);
INSERT INTO `sessions` VALUES('ce08a9b61e9d312f29279e243dbb4dc7', 1, 'admin', '::1', 'a6dedb6096973e4576e1dfc9d048075d', 1386622451);
INSERT INTO `sessions` VALUES('bc5b5bcd9e05974a3aa3c5d653843182', 1, 'admin', '::1', 'a6dedb6096973e4576e1dfc9d048075d', 1386639782);
INSERT INTO `sessions` VALUES('3e0bd8fe0ea6b135f9872269b8152637', 1, 'admin', '::1', 'a6dedb6096973e4576e1dfc9d048075d', 1386710282);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `section` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL,
  `value` varchar(1000) NOT NULL,
  `type` varchar(10) NOT NULL,
  `description` text NOT NULL,
  `default_value` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `settings`
--


-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

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
  `is_proposald` tinyint(4) NOT NULL,
  `proposal_id` int(11) DEFAULT NULL,
  `completed_by` int(11) NOT NULL,
  `completed_date` int(11) DEFAULT NULL,
  `created_date` int(11) NOT NULL,
  `total_time` int(11) NOT NULL,
  `modified_date` int(11) NOT NULL,
  `is_archived` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` VALUES(1, 'task by testadmin', '', 1, 1, 0, 3, 3, 0, NULL, 52, NULL, 0, 0, 0, NULL, 0, NULL, 1381476536, 36302, 0, 0);
INSERT INTO `tasks` VALUES(2, 'new', 'none', 1, 1, 0, 3, 1, 0, 1386576000, NULL, 'At Risk', 0, 0, 0, NULL, 0, NULL, 1386622434, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `time_entries`
--

CREATE TABLE `time_entries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `time_entries`
--

INSERT INTO `time_entries` VALUES(1, 36300, 1, 1, 1386621780);
INSERT INTO `time_entries` VALUES(2, 2, 1, 1, 1386621786);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` VALUES(1, 0, 'Sample', 'Admin', 'admin', '', '', '', '42e8e8061bd17e8d1b5b7220251d0d396a1250d962796199050307107f85b2e7', '312ffb9033bc186578bc085954a7894df47f591a7f760c69df35ff878a8006a9', '');
INSERT INTO `users` VALUES(2, 1, 'Sample', 'User', 'sample@example.com', '123 Fern St', 'Atlanta GA', '111-111-1111', '', '', '');
INSERT INTO `users` VALUES(3, 2, 'TestAdmin', 'TestAdmin', 'TestAdmin', '', '', '', '42e8e8061bd17e8d1b5b7220251d0d396a1250d962796199050307107f85b2e7', '312ffb9033bc186578bc085954a7894df47f591a7f760c69df35ff878a8006a9', '');
