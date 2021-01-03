USE [CustomerJourney]
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
           ,0
           ,'Complete'
           ,'Small'
           ,'Checked By Manager'
           ,'Checklist'
           ,0)
GO


