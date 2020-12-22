USE [CustomerJourney]
GO

/****** Object:  Table [dbo].[Config_Fields]    Script Date: 22/12/2020 19:31:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FieldsDBO](
	[Id] [int] NOT NULL IDENTITY(1,1) PRIMARY KEY,
	[Seq] [int] NOT NULL,
	[Mandatory_Phase] [nvarchar](15) NULL,
	[Label] [nvarchar](25) NOT NULL,
	[Type] [nvarchar](15) NOT NULL,
)

GO