USE [CustomerJourney]
GO

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FieldsDBO](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[companyId] [int] NOT NULL,
	[seq] [int] NOT NULL,
	[mandatoryPhase] [nvarchar](15) NULL,
	[size] [nvarchar](10) NOT NULL,
	[label] [nvarchar](25) NOT NULL,
	[type] [nvarchar](15) NOT NULL,
	[summary] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO