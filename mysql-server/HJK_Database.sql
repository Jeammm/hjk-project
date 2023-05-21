-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: May 20, 2023 at 12:21 PM
-- Server version: 8.0.33
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `HJK Database`
--

-- --------------------------------------------------------

--
-- Table structure for table `Basket`
--

CREATE TABLE `Basket` (
  `Token` varchar(255) DEFAULT NULL,
  `ProductID` varchar(255) DEFAULT NULL,
  `Amount` int DEFAULT NULL,
  `Tag` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Brand`
--

CREATE TABLE `Brand` (
  `BrandID` int NOT NULL,
  `NameTH` varchar(255) DEFAULT NULL,
  `NameEN` varchar(255) DEFAULT NULL,
  `Logo` varchar(255) DEFAULT 'placeholder_logo.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Brand`
--

INSERT INTO `Brand` (`BrandID`, `NameTH`, `NameEN`, `Logo`) VALUES
(1, 'ทีโอเอ', 'TOA', 'placeholder_logo.png'),
(2, 'อีเกิ้ล วัน', 'Eagle One', 'placeholder_logo.png');

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `CategoryID` int NOT NULL,
  `CategoryTH` varchar(255) DEFAULT NULL,
  `CategoryEN` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`CategoryID`, `CategoryTH`, `CategoryEN`) VALUES
(1, 'กระดาษทราย', 'Abrasives'),
(2, 'เครื่องมือช่าง', 'Hand Tools'),
(3, 'เครื่องมือและอุปกรณ์เกี่ยวกับรถยนต์', NULL),
(4, 'สี', 'Paint');

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `ProductID` varchar(10) NOT NULL,
  `NameTH` varchar(255) DEFAULT NULL,
  `NameEN` varchar(255) DEFAULT NULL,
  `Thumbnail` varchar(255) DEFAULT NULL,
  `DesTH` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `DesEN` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Brand` int DEFAULT NULL,
  `IsColor` tinyint(1) NOT NULL DEFAULT '0',
  `SubCategory` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`ProductID`, `NameTH`, `NameEN`, `Thumbnail`, `DesTH`, `DesEN`, `Brand`, `IsColor`, `SubCategory`) VALUES
('01101', 'กระดาษทรายน้ำ ตรา ทีโอเอ', 'Waterproof Abrasive Paper - TOA', 'placeholder.png', 'เหมาะสำหรับทั้งงานขัดแบบน้ำและแบบแห้ง เช่น งานขัดสีรถยนต์ งานขัดโลหะหรือเหล็กต่างๆ คุณสมบัติคือเม็ดทรายมีคุณภาพสูง กระดาษหนาและเหนียว ซึ่งทนทานต่อการใช้งานขัดถูที่สูงกว่าทั่วไป โดยมีหลายเบอร์ให้เลือกใช้ตามความต้องการทั้งแบบหยาบและละเอียด', 'Suitable for both wet and dry work such as, car polishing, metal or steel polishing. High-quality sand on thick or tough paper. Durable high abrasive. Numbered for selection to meet needs from tough grade to high resolution.', 1, 0, '0101'),
('01102', 'กระดาษทรายน้ำ ตรา อีเกิ้ล วัน', 'Water Proof Abrasive Paper - EAGLE ONE', 'placeholder.png', 'ผงขัดผลิตจากซิลิคอนคาร์ไบด์ (silicon carbide) เหมาะสำหรับทั้งงานขัดแบบน้ำและแบบแห้ง มีหลายขนาดให้เลือกตามความเหมาะสมของชิ้นงานในราคายุติธรรม', 'Polishing powder is made with Silicon Carbine, suitable for wet and dry usage. There are a variety of code numbers, depending on your work. All are fairly priced.', 2, 0, '0101'),
('04101', 'สีทาภายนอก TOA', 'Exterior Paint - TOA', 'placeholder.png', 'สีสำหรับทาภายนอก ทนฝนทนแดด ไม่ขึนรา', 'Paint for Exterior uses. Resist to sunlight, rain, and fungi.', 1, 1, '0401'),
('04102', 'สีทาภายใน TOA', 'Interior Paint - TOA', 'placeholder.png', 'สีสำหรับทาภายใน ทนมือทนเท้า ไม่ขึนรา', 'Paint for interior uses. Resist to stain and fungi.', 1, 1, '0402');

-- --------------------------------------------------------

--
-- Table structure for table `Size`
--

CREATE TABLE `Size` (
  `ProductID` varchar(10) NOT NULL,
  `SizeID` int NOT NULL,
  `Des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Packing` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Size`
--

INSERT INTO `Size` (`ProductID`, `SizeID`, `Des`, `Packing`) VALUES
('01101', 1, '#80', '60 Pcs.'),
('01101', 2, '#100', '60 Pcs.'),
('01102', 1, '#120', '50 Pcs.'),
('01102', 2, '#150', '50 Pcs.'),
('04101', 1, '20 L.', '1 Pcs.'),
('04101', 2, '40 L.', '1 Pcs.'),
('04102', 1, '20 L.', '1 Pcs.'),
('04102', 2, '40 L.', '1 Pcs.');

-- --------------------------------------------------------

--
-- Table structure for table `SubCategory`
--

CREATE TABLE `SubCategory` (
  `SubCategoryID` varchar(10) NOT NULL,
  `CategoryID` int NOT NULL,
  `SubNameTH` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `SubNameEN` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `SubCategory`
--

INSERT INTO `SubCategory` (`SubCategoryID`, `CategoryID`, `SubNameTH`, `SubNameEN`) VALUES
('0101', 1, 'กระดาษทรายน้ำ', 'Waterproof Abrasive Paper'),
('0401', 4, 'สีทาภายนอก', 'Exterior Paint'),
('0402', 4, 'สีทาภายใน', 'Interior Paint');

-- --------------------------------------------------------

--
-- Table structure for table `Tag`
--

CREATE TABLE `Tag` (
  `TagID` int NOT NULL,
  `ProductID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TagDes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Basket`
--
ALTER TABLE `Basket`
  ADD KEY `Token` (`Token`,`ProductID`),
  ADD KEY `Tag` (`Tag`),
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `Tag_2` (`Tag`);

--
-- Indexes for table `Brand`
--
ALTER TABLE `Brand`
  ADD PRIMARY KEY (`BrandID`);

--
-- Indexes for table `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`CategoryID`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `Brand` (`Brand`);

--
-- Indexes for table `Size`
--
ALTER TABLE `Size`
  ADD UNIQUE KEY `ProductID_2` (`ProductID`,`SizeID`),
  ADD KEY `ProductID` (`ProductID`,`SizeID`);

--
-- Indexes for table `SubCategory`
--
ALTER TABLE `SubCategory`
  ADD PRIMARY KEY (`SubCategoryID`);

--
-- Indexes for table `Tag`
--
ALTER TABLE `Tag`
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `TagID` (`TagID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Basket`
--
ALTER TABLE `Basket`
  ADD CONSTRAINT `Basket_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`),
  ADD CONSTRAINT `Basket_ibfk_2` FOREIGN KEY (`Tag`) REFERENCES `Tag` (`TagID`);

--
-- Constraints for table `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `Product_ibfk_1` FOREIGN KEY (`Brand`) REFERENCES `Brand` (`BrandID`);

--
-- Constraints for table `Size`
--
ALTER TABLE `Size`
  ADD CONSTRAINT `Size_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`);

--
-- Constraints for table `Tag`
--
ALTER TABLE `Tag`
  ADD CONSTRAINT `Tag_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
