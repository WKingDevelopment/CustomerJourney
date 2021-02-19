CREATE TABLE [dbo].[PhasesDBO](
	[companyID] [int] NOT NULL,
	[phases] [nvarchar](500) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[companyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

INSERT INTO [dbo].[PhasesDBO]
           ([companyID]
           ,[phases])
     VALUES
           (0
           ,'Unphased*To Estimate*To Order*To Fit*To Pay*Complete')
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

INSERT INTO [dbo].[FieldsDBO]
           ([companyId]
		   ,[size]
	       ,[seq]
           ,[mandatoryPhase]
           ,[label]
           ,[type]
		   ,[summary])
     VALUES
           (0
		   ,'Small'
		   ,0
           ,'Complete'
           ,'House Number'
           ,'Number'
		   ,1),
           
           (0
		   ,'Small'
           ,0
           ,'Complete'
           ,'Checked By Manager'
           ,'Checklist'
           ,0)
GO

