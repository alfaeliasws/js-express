-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 22, 2024 at 12:50 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `task_aptavis`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `project` varchar(100) NOT NULL,
  `status` enum('Draft','In Progress','Done','') NOT NULL,
  `progress` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `project`, `status`, `progress`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Test', 'In Progress', 0, '2024-08-21 18:50:29', '2024-08-22 04:44:21', '2024-08-22 05:40:09'),
(2, 'Coach Justin', 'In Progress', 0, '2024-08-22 05:25:09', '2024-08-22 05:48:06', NULL),
(3, 'Nyonya Puff', 'In Progress', 90, '2024-08-22 05:40:39', '2024-08-22 05:48:45', NULL),
(4, 'Kukang', 'Draft', 0, '2024-08-22 05:49:02', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `task` varchar(100) NOT NULL,
  `weight` int(10) NOT NULL,
  `status` enum('Draft','In Progress','Done','') NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `project_id`, `task`, `weight`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'TestTask', 7, 'In Progress', '2024-08-21 18:59:18', '2024-08-22 04:42:41', '2024-08-22 05:40:09'),
(2, 1, 'TestTask2', 8, 'In Progress', '2024-08-21 18:59:18', '2024-08-22 04:44:21', '2024-08-22 05:40:09'),
(3, 1, 'TestTask555', 41, 'Draft', '2024-08-21 18:59:18', '2024-08-22 04:01:41', '2024-08-22 04:35:48'),
(5, 1, 'TestTask545', 22, 'Draft', '2024-08-22 04:56:15', NULL, '2024-08-22 05:40:09'),
(6, 1, 'TestTask545', 44, 'Draft', '2024-08-22 04:56:31', NULL, '2024-08-22 05:40:09'),
(7, 1, 'TestTask2555', 11, 'In Progress', '2024-08-22 04:57:02', NULL, '2024-08-22 05:40:09'),
(8, 2, 'Membeli Terasi', 54, 'Draft', '2024-08-22 05:28:27', '2024-08-22 05:48:06', NULL),
(9, 2, 'Makan Gorengan', 2, 'In Progress', '2024-08-22 05:28:43', NULL, NULL),
(10, 3, 'Nunggu Bubur Ayam', 54, 'Done', '2024-08-22 05:40:48', NULL, NULL),
(11, 3, 'Hati Hati Tuan Crab', 6, 'Draft', '2024-08-22 05:41:02', '2024-08-22 05:48:45', NULL),
(12, 2, 'Makan Kangkung', 4, 'Draft', '2024-08-22 05:49:14', NULL, NULL),
(13, 4, 'Makan Kangkung', 4, 'Draft', '2024-08-22 05:49:34', NULL, NULL),
(14, 4, 'Suku Kaki', 6, 'Done', '2024-08-22 05:49:46', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
