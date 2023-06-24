-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Jun 03, 2023 at 05:48 AM
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
  `Logo` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'placeholder_logo.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Brand`
--

INSERT INTO `Brand` (`BrandID`, `NameTH`, `NameEN`, `Logo`) VALUES
(1, 'ทีโอเอ', 'TOA', 'https://www.toagroup.com/themes/default/assets/static/images/logo.svg'),
(2, 'อีเกิ้ล วัน', 'Eagle One', 'https://ddstickers.com/wp-content/uploads/2018/07/Eagle-One-Logo.jpg'),
(3, 'ล็อบสเตอร์', 'Lobster', 'https://www.uraipaints.com/imgadmins/img_model/large/20200422115401.jpeg'),
(4, 'บิวตี้', 'Beauty', 'https://www.uraipaints.com/imgadmins/img_brand/logo/20200424142054.png'),
(5, 'ทีเอชดับบิว', 'THW', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Thw.logo.svg/2048px-Thw.logo.svg.png'),
(6, 'ม้า', 'Horse', 'https://cf.shopee.co.th/file/a65c9f2fc697c176f5e1c40b8072c911'),
(7, 'เหมียว', 'Meow', '');

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
  `CategoryEN` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Category`
--

INSERT INTO `Category` (`CategoryID`, `CategoryTH`, `CategoryEN`) VALUES
(1, 'กระดาษทราย', 'Abrasives'),
(4, 'สี', 'Paint'),
(7, 'อุปกรณ์ขัด อุปกรณ์เจีย', 'Drilling Tools'),
(10, 'อุปกรณ์สื่อสาร', 'Communication device'),
(5, 'อุปกรณ์เจาะ', 'Drilling Tool'),
(2, 'เครื่องมือช่าง', 'Hand Tools'),
(8, 'เครื่องมือตัด', 'Cutting Tools'),
(6, 'เครื่องมือวัด', 'Measuring Tools'),
(3, 'เครื่องมือและอุปกรณ์เกี่ยวกับรถยนต์', 'Mobils Tools'),
(11, 'แปรง ลูกกลิ้งทาสี', 'Paint Brush and Roller'),
(9, 'ไฟฟ้า', 'Electronic');

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
  `Thumbnail` varchar(255) DEFAULT NULL,
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
('01101', 'กระดาษทรายน้ำ ตรา ทีโอเอ', 'Waterproof Abrasive Paper - TOA', 'https://iili.io/HrZIFaV.png', 'เหมาะสำหรับทั้งงานขัดแบบน้ำและแบบแห้ง เช่น งานขัดสีรถยนต์ งานขัดโลหะหรือเหล็กต่างๆ คุณสมบัติคือเม็ดทรายมีคุณภาพสูง กระดาษหนาและเหนียว ซึ่งทนทานต่อการใช้งานขัดถูที่สูงกว่าทั่วไป โดยมีหลายเบอร์ให้เลือกใช้ตามความต้องการทั้งแบบหยาบและละเอียด', 'Suitable for both wet and dry work such as, car polishing, metal or steel polishing. High-quality sand on thick or tough paper. Durable high abrasive. Numbered for selection to meet needs from tough grade to high resolution.', 1, 0, '0101', 1, '347018463_267726515705587_1556222189870781683_n.png'),
('01102', 'กระดาษทรายน้ำ ตรา อีเกิ้ล วัน', 'Water Proof Abrasive Paper - EAGLE ONE', 'https://inwfile.com/s-gc/1ytxr0.jpg', 'ผงขัดผลิตจากซิลิคอนคาร์ไบด์ (silicon carbide) เหมาะสำหรับทั้งงานขัดแบบน้ำและแบบแห้ง มีหลายขนาดให้เลือกตามความเหมาะสมของชิ้นงานในราคายุติธรรม', 'Polishing powder is made with Silicon Carbine, suitable for wet and dry usage. There are a variety of code numbers, depending on your work. All are fairly priced.', 2, 0, '0101', 1, NULL),
('01103', 'กระดาษทรายน้ำ ตรา นิตโต้', 'Water Proof Abrasive Paper - Nitto', 'https://iili.io/HrDITcx.jpg', 'ใช้ขัดสีพ่นรถยนต์ ชิ้นงานเหล็ก และเฟอร์นิเจอร์พลาสติก เป็นกระดาษทรายน้ำที่ให้ความคมเพื่อขัดชิ้นงาน จึงได้ความเรียบและสวยงาม เม็ดทรายมีการยึดเกาะแน่นกับแผ่นกระดาษ ไม่หลุดล่อนง่าย', 'The product can be used for car paint, metal and plastic furniture. Waterproof abrasive paper with sharp abrasion that can give a very smooth finish. Abrasive is stuck tough to the paper for long lasting usage.', NULL, 0, '0101', 1, '6410504390.jpg'),
('01104', 'กระดาษทรายน้ำ ตรา นิตเต้', NULL, 'https://iili.io/Hrb8xGS.jpg', 'ใช้ขัดสีพ่นรถยนต์ ชิ้นงานเหล็ก และเฟอร์นิเจอร์พลาสติก เป็นกระดาษทรายน้ำที่ให้ความคมเพื่อขัดชิ้นงาน จึงได้ความเรียบและสวยงาม เม็ดทรายมีการยึดเกาะแน่นกับแผ่นกระดาษ ไม่หลุดล่อนง่าย\"', NULL, NULL, 0, '0101', 1, NULL),
('02001', 'กรรไกรตัดเหล็กเส้น ตรา ม้า', NULL, NULL, 'กรรไกรตัดเหล็กเส้น ตรา ม้ากรรไกรตัดเหล็กเส้น ตรา ม้า', NULL, 6, 0, '0201', 1, NULL),
('04101', 'สีทาภายนอก TOA', 'Exterior Paint - TOA', 'https://www.toagroup.com/storage/products/decorative-coatings/premium/shield-1-primer-2022.png', 'สีสำหรับทาภายนอก ทนฝนทนแดด ไม่ขึนรา สีสวย', 'Paint for Exterior uses. Resist to sunlight, rain, and fungi.', 1, 1, '0401', 1, NULL),
('04102', 'สีทาภายใน TOA', 'Interior Paint - TOA', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKwkbSVVG09M-GHkYYv8jyMtbRFIolOMce6oewKEed8_GUEZcgaDIRMmlyZv8a9eDoDwY&usqp=CAU', 'สีสำหรับทาภายใน ทนมือทนเท้า ไม่ขึนรา', 'Paint for interior uses. Resist to stain and fungi.', 1, 1, '0402', 1, NULL),
('04103', 'asd', NULL, NULL, 'asd', NULL, NULL, 0, '0403', 1, NULL),
('04104', 'สีไม้เฟเบอคาสเทล', NULL, NULL, 'แพงแต่ดี', NULL, NULL, 1, '0403', 1, NULL),
('04105', 'สีไม้ตะเข้', NULL, NULL, 'กำลังดี', NULL, NULL, 1, '0403', 1, NULL),
('04106', 'สีตราม้า', NULL, NULL, 'ไม่ชอบ', NULL, NULL, 0, '0403', 1, NULL),
('04107', 'สีทาภายนอก ตรากุ้ง', NULL, NULL, 'กุ้งๆๆๆๆๆๆ', NULL, 3, 1, '0401', 1, NULL),
('05001', 'สว่านเจาะกระโหลก', NULL, NULL, 'สว่านเจาะกระโหลกสว่านเจาะกระโหลกสว่านเจาะกระโหลก', NULL, 4, 0, '0501', 1, NULL),
('07001', 'หินเจีย', NULL, NULL, 'หินเจีย', NULL, 2, 0, '0701', 1, NULL),
('09001', 'สายไฟ VAF ตรา THW', NULL, NULL, 'สายไฟ VAF ตรา THWสายไฟ VAF ตรา THWสายไฟ VAF ตรา THWสายไฟ VAF ตรา THW', NULL, 5, 0, '0901', 1, NULL),
('10001', 'แมวคอลเซนเตอร์', NULL, 'https://iili.io/HrZI0ns.jpg', 'แมวคอลเซนเตอร์แมวคอลเซนเตอร์แมวคอลเซนเตอร์แมวคอลเซนเตอร์แมวคอลเซนเตอร์แมวคอลเซนเตอร์แมวคอลเซนเตอร์แมวคอลเซนเตอร์แมวคอลเซนเตอร์แมวคอลเซนเตอร์แมวคอลเซนเตอร์', NULL, 7, 0, '1001', 0, NULL),
('11001', 'แปรงทาสี TOA', NULL, 'https://iili.io/HrbQ8yN.jpg', 'แปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOAแปรงทาสี TOA asdasd', NULL, 1, 1, '1101', 0, NULL);

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
('01101', 1, '#80', '60 Pcs.', 100),
('01101', 2, '#100', '60 Pcs.', 110),
('01101', 3, '#200', '60 Pcs.', 200),
('01101', 4, '#1000', '60 Pcs.', 500),
('01101', 5, '#2000', '60 Pcs.', 1000),
('01101', 6, '2', '6', 9),
('01101', 7, '3', '7', 0),
('01101', 8, '4', '8', 1),
('01102', 1, '#120', '50 Pcs.', 120),
('01102', 2, '#150', '50 Pcs.', 130),
('01104', 1, '1', '2', 3),
('02001', 1, '1', '2', 10000),
('04101', 1, '20 L.', '1 Pcs.', 140),
('04101', 2, '40 L.', '1 Pcs.', 150),
('04101', 3, '60 L.', '1 Pcs.', 160),
('04101', 4, '70 L.', '1 Pcs.', 170),
('04101', 5, '80 L.', '1 Pcs.', 180),
('04102', 1, '20 L.', '1 Pcs.', 160),
('04102', 2, '40 L.', '1 Pcs.', 170),
('04103', 1, 'as23', 'sda', 123),
('04104', 1, '1213', '123', 123),
('04105', 1, 'ๅ/-', 'หฟก', 123),
('04106', 1, 'ๅ/-', 'ๅ/-', 123),
('04107', 1, '1 Gallon', '1 Pcs.', 350),
('05001', 1, 'ภ', 'ถ', 2),
('07001', 1, '2', '3', 4),
('09001', 1, '20 m.', '1 ม้วน', 500),
('09001', 2, '40 m.', '1 ม้วน', 1000),
('10001', 1, '1', '1', 10000);

-- --------------------------------------------------------

--
-- Table structure for table `SubCategory`
--

CREATE TABLE `SubCategory` (
  `SubCategoryID` varchar(10) NOT NULL,
  `CategoryID` int NOT NULL,
  `SubNameTH` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `SubNameEN` varchar(255) NOT NULL,
  `Thumbnail` varchar(255) NOT NULL DEFAULT 'placeholder.png',
  `source` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `SubCategory`
--

INSERT INTO `SubCategory` (`SubCategoryID`, `CategoryID`, `SubNameTH`, `SubNameEN`, `Thumbnail`, `source`) VALUES
('0101', 1, 'กระดาษทรายน้ำ', 'Waterproof Abrasive Paper', 'https://inwfile.com/s-gc/14hprf.jpg', NULL),
('0102', 1, 'กระดาษทรายกลม', 'Abrasive Fiber Disc', 'placeholder.png', NULL),
('0103', 1, 'กระดาษทรายม้วน', 'Abrasive Cloth Roll', 'placeholder.png', NULL),
('0104', 1, 'ผ้าทราย', 'Abrasive Cloth', 'undefined', NULL),
('0201', 2, 'กรรไกรตัดเหล็กเส้น', 'Bolt Clipper', 'placeholder.png', NULL),
('0401', 4, 'สีทาภายนอก', 'Exterior Paint', 'https://www.toagroup.com/storage/products/decorative-coatings/premium/shield-1-primer-2022.png', NULL),
('0402', 4, 'สีทาภายใน', 'Interior Paint', 'https://iili.io/HrDITcx.jpg', '6410504390.jpg'),
('0403', 4, 'สีไม้', 'Colored Pencil', 'https://iili.io/HrbvZva.jpg', 'second.jpg'),
('0501', 5, 'สว่านไฟฟ้า', 'Electric Drill', 'undefined', NULL),
('0701', 7, 'หินเจีย', 'Grinding Stone', 'undefined', NULL),
('0901', 9, 'สายไฟ', 'wire', 'undefined', NULL),
('1001', 10, 'หูฟังชนิดครอบหู', 'Headphone', 'undefined', NULL),
('1101', 11, 'แปรงทาสี', 'Paint Brush', 'undefined', NULL);

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
