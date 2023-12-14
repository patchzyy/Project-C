﻿// <auto-generated />
using System;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20231214154440_xsxall")]
    partial class xsxall
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.14")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Backend.Entities.Account", b =>
                {
                    b.Property<int>("AccountId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("AccountId"));

                    b.Property<int>("Class")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.HasKey("AccountId");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("Backend.Entities.Customer", b =>
                {
                    b.Property<int>("CustomerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("CustomerId"));

                    b.Property<int>("AccountId")
                        .HasColumnType("integer");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.HasKey("CustomerId");

                    b.HasIndex("AccountId")
                        .IsUnique();

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("Backend.Entities.Department", b =>
                {
                    b.Property<int>("DepartmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("DepartmentId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("DepartmentId");

                    b.ToTable("Departments");
                });

            modelBuilder.Entity("Backend.Entities.Employee", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("EmployeeId"));

                    b.Property<int>("AccountId")
                        .HasColumnType("integer");

                    b.Property<int>("DepartmentId")
                        .HasColumnType("integer");

                    b.HasKey("EmployeeId");

                    b.HasIndex("AccountId")
                        .IsUnique();

                    b.HasIndex("DepartmentId");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("Backend.Entities.Machine", b =>
                {
                    b.Property<int>("MachineId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("MachineId"));

                    b.Property<int>("CustomerId")
                        .HasColumnType("integer");

                    b.Property<int>("DepartmentId")
                        .HasColumnType("integer");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Solution")
                        .HasColumnType("text");

                    b.HasKey("MachineId");

                    b.HasIndex("CustomerId");

                    b.ToTable("Machines");
                });

            modelBuilder.Entity("Backend.Entities.Solution", b =>
                {
                    b.Property<int>("SolutionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("SolutionId"));

                    b.Property<string>("ProblemDescription")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("SolutionDescription")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("TicketId")
                        .HasColumnType("integer");

                    b.HasKey("SolutionId");

                    b.ToTable("Solutions");
                });

            modelBuilder.Entity("Backend.Entities.Ticket", b =>
                {
                    b.Property<int>("TicketId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("TicketId"));

                    b.Property<int?>("CustomerId")
                        .HasColumnType("integer");

                    b.Property<int>("Customer_Id")
                        .HasColumnType("integer");

                    b.Property<string>("Date_Created")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("Employee_Id")
                        .HasColumnType("integer");

                    b.Property<string[]>("Files")
                        .HasColumnType("text[]");

                    b.Property<string>("HaveTried")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Machine_Id")
                        .HasColumnType("integer");

                    b.Property<string>("MustBeDoing")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string[]>("Notes")
                        .HasColumnType("text[]");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<string>("Priority")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Problem")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Solution")
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("TicketId");

                    b.HasIndex("CustomerId");

                    b.HasIndex("Employee_Id");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("Backend.Entities.TicketFile", b =>
                {
                    b.Property<int>("FileId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("FileId"));

                    b.Property<string>("FileName")
                        .HasColumnType("text");

                    b.Property<string>("FilePath")
                        .HasColumnType("text");

                    b.Property<string>("FileType")
                        .HasColumnType("text");

                    b.Property<int>("Ticket_Id")
                        .HasColumnType("integer");

                    b.HasKey("FileId");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("Backend.Entities.Customer", b =>
                {
                    b.HasOne("Backend.Entities.Account", "Account")
                        .WithOne()
                        .HasForeignKey("Backend.Entities.Customer", "AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");
                });

            modelBuilder.Entity("Backend.Entities.Employee", b =>
                {
                    b.HasOne("Backend.Entities.Account", "Account")
                        .WithOne()
                        .HasForeignKey("Backend.Entities.Employee", "AccountId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Entities.Department", "Department")
                        .WithMany("Employees")
                        .HasForeignKey("DepartmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Account");

                    b.Navigation("Department");
                });

            modelBuilder.Entity("Backend.Entities.Machine", b =>
                {
                    b.HasOne("Backend.Entities.Customer", null)
                        .WithMany("Machines")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Backend.Entities.Ticket", b =>
                {
                    b.HasOne("Backend.Entities.Customer", null)
                        .WithMany("Tickets")
                        .HasForeignKey("CustomerId");

                    b.HasOne("Backend.Entities.Employee", null)
                        .WithMany("Tickets")
                        .HasForeignKey("Employee_Id");
                });

            modelBuilder.Entity("Backend.Entities.Customer", b =>
                {
                    b.Navigation("Machines");

                    b.Navigation("Tickets");
                });

            modelBuilder.Entity("Backend.Entities.Department", b =>
                {
                    b.Navigation("Employees");
                });

            modelBuilder.Entity("Backend.Entities.Employee", b =>
                {
                    b.Navigation("Tickets");
                });
#pragma warning restore 612, 618
        }
    }
}
