-- Banco de Dados do PI
-- Páginas Compartilhadas

  
 create database PaginasCompartilhadas
 go
 use PaginasCompartilhadas

-- Tabela Usuário

Create Table Usuario(
	Id_Usuario INT IDENTITY (1,1) PRIMARY KEY,
	Nm_Usuario VARCHAR (50),
	Email_Usuario VARCHAR (75),
	Cpf_Cnpj VARCHAR (20),
	Tel_Usuario VARCHAR (18),
	End_Usuario VARCHAR (100),
	Dt_Cadastro DATETIME,
	Tp_Usuario VARCHAR (18),
  	Status_Usuario VARCHAR (10),
  	Senha_Usuario VARCHAR (16));
    
insert into Usuario (Nm_Usuario, Email_Usuario, Cpf_Cnpj, Tel_Usuario, End_Usuario, Dt_Cadastro, Tp_Usuario, Status_Usuario, Senha_Usuario) 
values	('Ellie Dashkov', 'edashkov0@mozilla.com', '486.605.044-46', '(56) 91223-1112', '5377 Derek Point', '02/07/2025', 'Doador', 'Ativo', 'iJ2)I?h<*TxJ_)!U'),
		('Hettie Melliard', 'hmelliard1@blogs.com', '29.176.709/0001-77', '(95) 26759-7069', '634 8th Point', '23/11/2025', 'Recebedor', 'Inativo', 'pT9?AvP!L,r$jPsu'),
		('Meridel Nimmo', 'mnimmo2@sciencedaily.com', '73.761.970/0001-52', '(40) 38383-3914', '05267 Mendota Avenue', '01/09/2025', 'Recebedor', 'Ativo', 'uC6<i+7tbsWRC&)'),
		('Myles Tagg', 'mtagg3@cnbc.com', '740.213.377-93', '(01) 79247-7392', '20244 Roth Junction', '14/01/2025', 'Doador', 'Ativo', 'fN2,2E~3$y>'),
		('Vladimir MacWilliam', 'vmacwilliam4@xing.com', '613.878.980-89', '(03) 78511-5738', '4 Lillian Place', '08/02/2025', 'Recebedor', 'Inativo', 'gX6+P2EbSrM,C!')

			   
-- Tabela Livro

Create Table Livro(
	Id_Livro INT IDENTITY (1,1) PRIMARY KEY,
	Titulo VARCHAR (100),
	Editora VARCHAR (50),
	Genero VARCHAR (30),
	Autor VARCHAR (50),
	Ano_Publi INT,
    UsuarioID INT,
	Constraint FK_UsuarioID Foreign Key (UsuarioID) References Usuario (Id_Usuario));

insert into Livro(Titulo, Editora, Genero, Autor, Ano_Publi, UsuarioID)
values	('A Menina que Roubava Livros', 'Intrínseca', 'Drama', 'Markus Zusak', 2005, 1),
		('Orgulho e Preconceito', 'Penguin-Companhia', 'Romance', 'Jane Austen', 1813, 4),
		('Dom Casmurro', 'Ateliê Editorial', 'Clássico Brasileiro', 'Machado de Assis', 1899, 1),
		('O Senhor dos Anéis: A Sociedade do Anel', 'HarperCollins', 'Fantasia Épica', 'J.R.R.Tolkien', 1954, 4),
		('1984', 'Companhia das Letras', 'Distopia', 'George Orwell', 1949, 4)


-- Tabela Doação

Create Table Doacao(
	Id_Doacao INT IDENTITY (1,1) PRIMARY KEY,
	Dt_Doacao DATETIME,
	Status_Doacao VARCHAR (15),
	Tp_Acao VARCHAR (15),
	UsuarioId INT,
  	LivroId INT,
	Constraint FK_UsuarioDoacao Foreign Key (UsuarioId) References Usuario (Id_Usuario),
    Constraint FK_LivroId Foreign Key (LivroId) References Livro (Id_Livro));

insert into Doacao(Dt_Doacao, Status_Doacao, UsuarioId, LivroId)
values	('25/10/2025', 'Finalizada', 2, 1),
		('28/10/2025', 'Aguardando', 4, 5),
		('30/10/2025', 'Cancelada', 5, 3),
		('05/11/2025', 'Finalizada', 3, 2),
		('10/11/2025', 'Finalizada', 1, 4)

			   		 	  
-- Tabela Log_Doação

Create Table Log_Doacao(
	Id_Log_Doacao INT IDENTITY (1,1) PRIMARY KEY,
	Dt_Log DATETIME,
	Usuario_Log INT,
	Acao_Log VARCHAR (16),
	Constraint FK_Usuario_Log Foreign Key (Usuario_Log) References Usuario (Id_Usuario));


-- Tabela Interação

Create Table Interacao(
	Id_Interacao INT IDENTITY (1,1) PRIMARY KEY,
	Dt_Interacao DATETIME,
	Tp_Interacao VARCHAR (20),
	Texto Text,
	Arquivo Text,
  	UsuarioId INT,
  	LivroId INT,
  	DoacaoId INT,
	Constraint FK_UsuarioInteracao Foreign Key (UsuarioId) References Usuario (Id_Usuario),
    Constraint FK_DoacaoInteracao Foreign Key (DoacaoId) References Doacao (Id_Doacao));

insert into Interacao(Dt_Interacao, Texto, UsuarioId, LivroId, DoacaoId) 
values	('02/06/2025', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.', 1, 2, 4),
		('29/09/2025', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 2, 5, 3),
		('13/03/2025', 'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.', 3, 4, 1),
		('02/08/2025', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',4, 3, 2),
		('01/07/2025', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 3, 2, 1)
			   		 

-- Tabela Log_Interação

Create Table Log_Interacao(
	Id_Log_Interacao INT IDENTITY (1,1) PRIMARY KEY,
	Dt_Log DATETIME,
	Usuario_Log INT,
	Acao_Log VARCHAR (16),
	Constraint FK_Usuario_LogInt Foreign Key (Usuario_Log) References Usuario (Id_Usuario));


-- Tabela Feedback

Create Table Feedback(
	Id_Feedback INT IDENTITY (1,1) PRIMARY KEY,
	Conteudo TEXT,
	Nota_Feedback INT,
	Dt_Feedback DATETIME,
	UsuarioId INT,
  	DoacaoId INT,
	Constraint FK_UsuarioFeedback Foreign Key (UsuarioId) References Usuario (Id_Usuario),
    Constraint FK_DoacaoFeedback Foreign Key (DoacaoId) References Doacao (Id_Doacao));

insert into Feedback (Conteudo, Nota_Feedback, Dt_Feedback, UsuarioId, DoacaoId) 
values	('Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa', 4, '30/09/2025', 1, 3),
		('Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.', 2, '16/02/2025', 4, 1),
		('In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.', 3, '16/09/2025', 4, 2),
		('Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue.', 1, '23/12/2024', 5, 3),
		('Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.', 3, '14/11/2025', 4, 2)
		

-- Tabela Postagem

Create Table Postagem (
	Id_Postagem INT IDENTITY (1,1) PRIMARY KEY,
	Dt_Postagem DATETIME,	
  	Cont_Postagem TEXT,
	Arq_Postagem TEXT,
	UsuarioId INT,
  	Constraint FK_UsuarioPostagem Foreign Key (UsuarioId) References Usuario (Id_Usuario));

insert into Postagem (Dt_Postagem, Cont_Postagem, UsuarioId) 
values	('08/09/2025', 'Pellentesque at nulla. Suspendisse potenti.', 3), 
		('18/05/2025', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.', 5),
		('23/12/2024', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 2),
		('18/09/2025', 'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.', 4), 
		('24/07/2025', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.', 1)

		
-- Tabela Comentario

Create Table Comentario (
	Id_Comentario INT IDENTITY (1,1) PRIMARY KEY,
	Dt_Comentario DATETIME,	
  	Cont_Comentario TEXT,
	UsuarioId INT,
  	PostagemId INT,
  	Constraint FK_UsuarioComentario Foreign Key (UsuarioId) References Usuario (Id_Usuario),
	Constraint FK_PostagemComentario Foreign Key (PostagemId) References Postagem (Id_Postagem));

insert into Comentario (Dt_Comentario, Cont_Comentario, UsuarioId, PostagemId)
values	('23/12/2024', 'Nullam sit amet turpis elementum ligula vehicula consequat.', 5, 2), 
		('28/05/2025', 'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 3, 1), 
		('12/02/2025', 'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.', 2, 5), 
		('24/01/2025', 'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit.', 1, 4), 
		('22/05/2025', 'Sed ante. Vivamus tortor. Duis mattis egestas metus.', 4, 3)


-- Tabela Curtida

Create Table Curtida (
	Id_Curtida INT IDENTITY (1,1) PRIMARY KEY,
	Dt_Curtida DATETIME,	
  	UsuarioId INT,
  	PostagemId INT,
  	ComentarioId INT,
  	Constraint FK_UsuarioCurtida Foreign Key (UsuarioId) References Usuario (Id_Usuario),
	Constraint FK_PostagemCurtida Foreign Key (PostagemId) References Postagem (Id_Postagem),
	Constraint FK_ComentarioCurtida Foreign Key (ComentarioId) References Comentario (Id_Comentario));

insert into Curtida (Dt_Curtida, UsuarioId, PostagemId, ComentarioId)
values	('23/12/2024', 5, 2, 1), 
		('27/12/2024', 2, 5, 3),
		('30/12/2024', 1, 4, 2),
		('01/02/2025', 4, 1, 5),
		('15/09/2025', 3, 3, 4)


-- Tabela Denuncia

Create Table Denuncia (
	Id_Denuncia INT IDENTITY (1,1) PRIMARY KEY,
	Dt_Denuncia DATETIME,
  	Tp_Denuncia VARCHAR (16),
  	UsuarioId INT,
  	PostagemId INT,
  	ComentarioId INT,
  	Constraint FK_UsuarioDenuncia Foreign Key (UsuarioId) References Usuario (Id_Usuario),
	Constraint FK_PostagemDenuncia Foreign Key (PostagemId) References Postagem (Id_Postagem),
	Constraint FK_ComentarioDenuncia Foreign Key (ComentarioId) References Comentario (Id_Comentario));

insert into Denuncia (Dt_Denuncia, Tp_Denuncia, UsuarioId, PostagemId, ComentarioId)
values	('20/12/2024', 'Postagem', 1, 3, 2),
		('12/05/2025', 'Comentario', 3, 5, 3),
		('07/06/2025', 'Postagem', 2, 4, 1),
		('03/07/2025', 'Postagem', 5, 5, 5),
		('25/07/2025', 'Comentario', 4, 2, 4)


-- Select's

Select * From Usuario
Select * From Livro
Select * From Doacao
Select * From Interacao
Select * From Feedback
Select * From Postagem
Select * From Comentario
Select * From Curtida
Select * From Denuncia
