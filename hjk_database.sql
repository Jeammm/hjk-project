-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jul 04, 2023 at 05:32 PM
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
-- Database: `hjk_database`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`%` PROCEDURE `sp_ResetBannerSetting` ()   BEGIN
    -- Clear all data in the table
    DELETE FROM BannerSetting;
    
    -- Reset the auto-increment counter
    ALTER TABLE BannerSetting AUTO_INCREMENT = 1;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Banner`
--

CREATE TABLE `Banner` (
  `BannerID` int NOT NULL,
  `BannerURL` varchar(255) NOT NULL,
  `BannerDes` varchar(255) DEFAULT NULL,
  `BannerName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Banner`
--

INSERT INTO `Banner` (`BannerID`, `BannerURL`, `BannerDes`, `BannerName`) VALUES
(7, 'https://iili.io/HPO3YBe.png', 'Default Storage background', 'HJK Logo --Storage bg'),
(8, 'https://iili.io/HPO3GpV.jpg', 'Engineers Day Lorem Ipsum', 'Engineers Day'),
(9, 'https://iili.io/HPO3vvR.png', 'WaiZon ก็อกน้ำ', 'WaiZon ก็อกน้ำ');

-- --------------------------------------------------------

--
-- Table structure for table `BannerSelected`
--

CREATE TABLE `BannerSelected` (
  `BannerNo` int NOT NULL,
  `BannerID` int NOT NULL,
  `Interval` int NOT NULL DEFAULT '5000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `BannerSelected`
--

INSERT INTO `BannerSelected` (`BannerNo`, `BannerID`, `Interval`) VALUES
(12, 8, 5000),
(13, 7, 5000),
(14, 9, 5000);

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
  `Logo` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'http://via.placeholder.com/640x360'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Brand`
--

INSERT INTO `Brand` (`BrandID`, `NameTH`, `NameEN`, `Logo`) VALUES
(1, 'WaiZon', 'WaiZon', 'https://iili.io/HPz9kJ4.jpg'),
(2, 'Marker', 'Marker', 'https://iili.io/HPx6oTx.jpg'),
(3, 'ทีโอเอ', 'TOA', 'https://iili.io/HPk2qJf.png'),
(4, 'อีเกิ้ล วัน', 'Eagle One', 'http://via.placeholder.com/110x110'),
(5, 'กุ้ง', 'Lobster', 'http://via.placeholder.com/110x110'),
(6, 'โฟว์ซีซัน', '4Season', 'http://via.placeholder.com/110x110'),
(7, 'ม้า', 'Horse', 'http://via.placeholder.com/110x110');

--
-- Triggers `Brand`
--
DELIMITER $$
CREATE TRIGGER `before_insert_brand` BEFORE INSERT ON `Brand` FOR EACH ROW BEGIN
  DECLARE new_brand_id INT;
  SET new_brand_id = COALESCE((SELECT MAX(BrandID) FROM Brand), 0) + 1;
  SET NEW.BrandID = new_brand_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Category`
--

CREATE TABLE `Category` (
  `CategoryID` int NOT NULL,
  `CategoryTH` varchar(255) DEFAULT NULL,
  `CategoryEN` varchar(255) DEFAULT NULL,
  `Thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'http://via.placeholder.com/640x360'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`CategoryID`, `CategoryTH`, `CategoryEN`, `Thumbnail`) VALUES
(1, 'Marker', 'Marker', 'https://iili.io/HPx6oTx.jpg'),
(2, 'Waizon', 'Waizon', 'https://iili.io/HPx6suj.jpg'),
(3, 'งานก่อสร้างทั่วไป', 'Construction Tools', 'https://iili.io/HPxPIAG.webp'),
(4, 'งานสี', 'Paint Tools', 'https://iili.io/HPxP1Hu.webp'),
(5, 'ห้องน้ำ สุขภัณฑ์ ส้วม', 'Bathroom', 'https://iili.io/HPxPNl1.webp'),
(6, 'ประตู หน้าต่าง', 'Doors and Windows', 'https://iili.io/HPxPSDv.webp'),
(7, 'เครื่องมือช่าง', 'Professional Tools', 'https://iili.io/HPxiHfS.webp'),
(8, 'อุปกรณ์ PVC', 'Plumbing Tools', 'https://iili.io/HPxiz0P.webp'),
(9, 'งานเกษตร', 'Garden Tools', 'https://iili.io/HPxiIg1.webp'),
(10, 'เครื่องใช้ไฟฟ้า', 'Electronic Tools', 'https://iili.io/HPxiXmG.webp'),
(11, 'งานโลหะ', 'Metalic Work Tools', 'https://iili.io/HPxiLBV.webp');

--
-- Triggers `Category`
--
DELIMITER $$
CREATE TRIGGER `auto increment id` BEFORE INSERT ON `Category` FOR EACH ROW BEGIN
    DECLARE maxCategoryID INT;
    SELECT MAX(CategoryID) INTO maxCategoryID FROM Category;
    
    SET NEW.CategoryID = IFNULL(maxCategoryID, 0) + 1;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Product`
--

CREATE TABLE `Product` (
  `ProductID` varchar(10) NOT NULL,
  `NameTH` varchar(255) DEFAULT NULL,
  `NameEN` varchar(255) DEFAULT NULL,
  `Thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'http://via.placeholder.com/640x360',
  `DesTH` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `DesEN` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Brand` int DEFAULT NULL,
  `IsColor` tinyint(1) NOT NULL DEFAULT '0',
  `SubCategory` varchar(10) NOT NULL,
  `Available` int NOT NULL DEFAULT '1',
  `source` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Product`
--

INSERT INTO `Product` (`ProductID`, `NameTH`, `NameEN`, `Thumbnail`, `DesTH`, `DesEN`, `Brand`, `IsColor`, `SubCategory`, `Available`, `source`) VALUES
('02001', 'ก็อกซิ้งล้างจาน WaiZon', NULL, 'https://iili.io/HPOTXZG.jpg', 'ก็อกซิ้งล้างจาน WaiZonก็อกซิ้งล้างจาน WaiZonก็อกซิ้งล้างจาน WaiZonก็อกซิ้งล้างจาน WaiZonก็อกซิ้งล้างจาน WaiZonก็อกซิ้งล้างจาน WaiZonก็อกซิ้งล้างจาน WaiZonก็อกซิ้งล้างจาน WaiZonก็อกซิ้งล้างจาน WaiZon', NULL, 1, 0, '0201', 1, 'S__280297486.jpg'),
('03001', 'อิฐ TOA', NULL, '', 'อิฐแดง TOA อิฐแดง TOA อิฐแดง TOA อิฐแดง TOA อิฐแดง TOA อิฐแดง TOA อิฐแดง TOA อิฐแดง TOA อิฐแดง TOA อิฐแดง TOA อิฐแดง TOA อิฐแดง TOA อิฐแดง TOA อิฐแดง TOA อิฐแดง TOA', NULL, 3, 0, '0301', 1, NULL);

--
-- Triggers `Product`
--
DELIMITER $$
CREATE TRIGGER `generate_product_id` BEFORE INSERT ON `Product` FOR EACH ROW BEGIN
    DECLARE category_id VARCHAR(2);
    DECLARE product_count INT;

    SET category_id = LEFT(NEW.SubCategory, 2);

    IF NOT EXISTS (SELECT 1 FROM Product WHERE SUBSTRING(ProductID, 1, 2) = category_id) THEN
        SET NEW.ProductID = CONCAT(category_id, '001');
    ELSE
        SELECT MAX(CAST(SUBSTRING(ProductID, 3) AS UNSIGNED)) INTO product_count FROM Product WHERE SUBSTRING(ProductID, 1, 2) = category_id;
        SET NEW.ProductID = CONCAT(category_id, LPAD(product_count + 1, 3, '0'));
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Size`
--

CREATE TABLE `Size` (
  `ProductID` varchar(10) NOT NULL,
  `SizeID` int NOT NULL,
  `Des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Packing` varchar(15) DEFAULT NULL,
  `Price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Size`
--

INSERT INTO `Size` (`ProductID`, `SizeID`, `Des`, `Packing`, `Price`) VALUES
('02001', 1, '1', '2', 3),
('03001', 1, '2x3x5', '60 Pcs.', 200);

-- --------------------------------------------------------

--
-- Table structure for table `SubCategory`
--

CREATE TABLE `SubCategory` (
  `SubCategoryID` varchar(10) NOT NULL,
  `CategoryID` int NOT NULL,
  `SubNameTH` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `SubNameEN` varchar(255) NOT NULL,
  `Thumbnail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'http://via.placeholder.com/640x360',
  `source` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `SubCategory`
--

INSERT INTO `SubCategory` (`SubCategoryID`, `CategoryID`, `SubNameTH`, `SubNameEN`, `Thumbnail`, `source`) VALUES
('0201', 2, 'ก็อกน้ำ', 'Faucet', 'https://iili.io/HPxpV7p.jpg', NULL),
('0301', 3, 'อิฐ', 'Bricks', 'https://iili.io/HPeyc2R.webp', NULL);

--
-- Triggers `SubCategory`
--
DELIMITER $$
CREATE TRIGGER `trg_SetSubCategoryID` BEFORE INSERT ON `SubCategory` FOR EACH ROW BEGIN
    DECLARE maxSubCategoryID VARCHAR(4);
    SET @categoryID := NEW.CategoryID;
    
    SELECT MAX(SubCategoryID) INTO maxSubCategoryID FROM SubCategory WHERE CategoryID = @categoryID;
    
    IF maxSubCategoryID IS NOT NULL THEN
        SET NEW.SubCategoryID = CONCAT(
            SUBSTRING(maxSubCategoryID, 1, 2),
            LPAD(CAST(SUBSTRING(maxSubCategoryID, 3) + 1 AS CHAR), 2, '0')
        );
    ELSE
        SET NEW.SubCategoryID = CONCAT(LPAD(CAST(@categoryID AS CHAR), 2, '0'), '01');
    END IF;
    
    IF NEW.SubCategoryID IS NULL THEN
        SET NEW.SubCategoryID = CONCAT(LPAD(CAST(@categoryID AS CHAR), 2, '0'), '01');
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `Tag`
--

CREATE TABLE `Tag` (
  `TagID` int NOT NULL,
  `ProductID` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `TagDes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `UserID` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`username`, `password`, `UserID`) VALUES
('test', '$2a$12$gxrxR.WvwBDtkhivHBlGjeKW1MtpUbMI44gzljpa0hnLbbPCihzW6', '8cfa22d7-fb1f-11ed-8e13-0242ac140003');

--
-- Triggers `Users`
--
DELIMITER $$
CREATE TRIGGER `generate_uuid_id` BEFORE INSERT ON `Users` FOR EACH ROW BEGIN
  SET NEW.UserID = UUID(); -- Generate a UUID and assign it to the new row
END
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Banner`
--
ALTER TABLE `Banner`
  ADD PRIMARY KEY (`BannerID`);

--
-- Indexes for table `BannerSelected`
--
ALTER TABLE `BannerSelected`
  ADD PRIMARY KEY (`BannerNo`);

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
  ADD PRIMARY KEY (`CategoryID`),
  ADD UNIQUE KEY `CategoryTH` (`CategoryTH`,`CategoryEN`),
  ADD UNIQUE KEY `CategoryTH_2` (`CategoryTH`),
  ADD UNIQUE KEY `CategoryEN` (`CategoryEN`);

--
-- Indexes for table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`ProductID`),
  ADD UNIQUE KEY `NameTH` (`NameTH`,`NameEN`),
  ADD KEY `Brand` (`Brand`),
  ADD KEY `NameTH_2` (`NameTH`,`NameEN`);

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
  ADD PRIMARY KEY (`SubCategoryID`),
  ADD UNIQUE KEY `SubNameTH` (`SubNameTH`),
  ADD UNIQUE KEY `SubNameEN` (`SubNameEN`);

--
-- Indexes for table `Tag`
--
ALTER TABLE `Tag`
  ADD KEY `ProductID` (`ProductID`),
  ADD KEY `TagID` (`TagID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Banner`
--
ALTER TABLE `Banner`
  MODIFY `BannerID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `BannerSelected`
--
ALTER TABLE `BannerSelected`
  MODIFY `BannerNo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
