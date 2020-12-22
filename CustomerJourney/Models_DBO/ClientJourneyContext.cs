using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace CustomerJourney.Models_DBO
{
    public partial class ClientJourneyContext : DbContext
    {
        public ClientJourneyContext()
        {
        }

        public ClientJourneyContext(DbContextOptions<ClientJourneyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<FieldsDBO> FieldsDBOs { get; set; }
        public virtual DbSet<PhasesDBO> PhasesDBOs { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=CustomerJourney;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<FieldsDBO>(entity =>
            {
                entity.ToTable("FieldsDBO");

                entity.Property(e => e.label)
                    .IsRequired()
                    .HasMaxLength(25);

                entity.Property(e => e.mandatoryPhase).HasMaxLength(15);

                entity.Property(e => e.type)
                    .IsRequired()
                    .HasMaxLength(15);
            });

            modelBuilder.Entity<PhasesDBO>(entity =>
            {
                entity.HasKey(e => e.companyID)
                    .HasName("PK__PhasesDB__AD5459B0FCE4B615");

                entity.ToTable("PhasesDBO");

                entity.Property(e => e.companyID).ValueGeneratedNever();

                entity.Property(e => e.phases)
                    .IsRequired()
                    .HasMaxLength(500);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
