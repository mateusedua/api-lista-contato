drop table if EXISTS contato;
drop table if EXISTS categoria;
drop table if EXISTS usuario;

create table categoria(
	id_categoria varchar(240) PRIMARY key,
  	categoria varchar(240) not NULL,
  	data_inclusao datetime DEFAULT CURRENT_TIMESTAMP
);

create table usuario(
	id_usuario varchar(240) PRIMARY key,
  	nome varchar(240) not NULL,
  	email varchar(240) not NULL,
  	password varchar(500) not NULL,
  	data_inclusao datetime default CURRENT_TIMESTAMP
);

create table contato(
	id_contato varchar(240) PRIMARY key,
  	id_categoria varchar(240) not NULL,
  	id_usuario varchar(240) NOT NULL,
  	nome varchar(240) not NULL,
  	email varchar(240) NOT NULL,
  	celular varchar(240) not NULL,
  	data_inclusao datetime default CURRENT_TIMESTAMP,
	foreign key(id_categoria) references categoria(id_categoria),
	foreign key(id_usuario) references usuario(id_usuario)
);

insert into categoria(id_categoria, categoria)
values('2e6f9b0d5885b6010f9167787445617f553a735f', 'Particular'),
('aad5f3e1f7d8fc48378d89fc4483bb84','Trabalho'),
('7fd3316897b06f6c7ad6888e1f3cdec8','Instagram');

insert into usuario(id_usuario, nome, email, password)
values('09f02ace9d36ad7a583e4fb252fb957e', 'Mateus Eduardo', 'mateus@gmail.com', '123');

insert into contato(id_contato, id_categoria, id_usuario, nome, email, celular)
values('d42654ccb4b4a3c937d5d1821732b445','2e6f9b0d5885b6010f9167787445617f553a735f','09f02ace9d36ad7a583e4fb252fb957e','Teste de Contato', 'mateus@gmail.com', '(43) 99698-0719');