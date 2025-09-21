class Aluno {
  constructor() {
    this.arrayAlunos = [];
    this.editMatricula = null;

    let dadosSalvos = localStorage.getItem("alunos");
    if (dadosSalvos) {
      this.arrayAlunos = JSON.parse(dadosSalvos);
      this.listaTabela();
    }
  }

  verificaMatricula(matricula) {
    for (let i = 0; i < this.arrayAlunos.length; i++) {
      if (this.arrayAlunos[i].matricula == matricula) {
        return true;
      }
    }
    return false;
  }

  lerDados() {
    let aluno = {};

    aluno.matricula = document.getElementById("matricula").value;
    aluno.nomeAluno = document.getElementById("aluno").value;
    aluno.cpf = document.getElementById("cpf").value;
    aluno.email = document.getElementById("email").value;
    aluno.curso = document.getElementById("curso").value;
    aluno.faculdade = document.getElementById("faculdade").value;

    return aluno;
  }

  listaTabela() {
    let tbody = document.getElementById("tbody");
    tbody.innerText = "";

    for (let i = 0; i < this.arrayAlunos.length; i++) {
      let tr = tbody.insertRow();
      const aluno = this.arrayAlunos[i];

      let td_matricula = tr.insertCell();
      let td_nomeAluno = tr.insertCell();
      let td_cpf = tr.insertCell();
      let td_email = tr.insertCell();
      let td_curso = tr.insertCell();
      let td_faculdade = tr.insertCell();
      let td_acoes = tr.insertCell();

      td_cpf.innerText = this.arrayAlunos[i].cpf;
      td_matricula.innerText = this.arrayAlunos[i].matricula;
      td_nomeAluno.innerText = this.arrayAlunos[i].nomeAluno.toUpperCase();
      td_email.innerText = this.arrayAlunos[i].email;
      td_curso.innerText = this.arrayAlunos[i].curso.toUpperCase();
      td_faculdade.innerText = this.arrayAlunos[i].faculdade.toUpperCase();

      td_faculdade.classList.add("center");
      td_cpf.classList.add("center");
      td_matricula.classList.add("center");
      td_nomeAluno.classList.add("center");
      td_email.classList.add("center");
      td_curso.classList.add("center");
      td_acoes.classList.add("center");

      let imgEdit = document.createElement("img");
      imgEdit.src = "img/edit.png";
      imgEdit.setAttribute(
        "onclick",
        "aluno.editar(" + JSON.stringify(this.arrayAlunos[i]) + ")"
      );

      let imgDelete = document.createElement("img");
      imgDelete.src = "./img/delete.png";
      imgDelete.setAttribute(
        "onclick",
        "aluno.deletar(" + this.arrayAlunos[i].matricula + ")"
      );

      td_acoes.appendChild(imgEdit);
      td_acoes.appendChild(imgDelete);
    }
  }

  validaCampos(aluno) {
    let msg = "";

    if (aluno.nomeAluno == "") {
      msg += "- Informe o Nome do Aluno \n";
    }

    if (aluno.matricula == "") {
      msg += "- Informe a Matrícula do Aluno \n";
    }

    if (aluno.email == "") {
      msg += "- Informe o Email do Aluno \n";
    }

    if (aluno.curso == "") {
      msg += "- Informe o Curso do Aluno \n";
    }

    if (aluno.faculdade == "") {
      msg += "- Informe a Faculdade do Aluno";
    }

    if (msg != "") {
      alert(msg);
      return false;
    }

    return true;
  }

  salvar() {
    let aluno = this.lerDados();

    if (this.validaCampos(aluno)) {
      if (this.editMatricula == null) {
        if (this.verificaMatricula(aluno.matricula)) {
          alert("Já existe um aluno com essa matrícula!");
          return;
        }
        if (
          prompt("Digite a Senha de Colaborador para Salvar o Aluno") == 2006
        ) {
          this.adicionar(aluno);
          this.cancelar();
        }
      } else {
        if (
          aluno.matricula !== this.editMatricula &&
          this.verificaMatricula(aluno.matricula)
        ) {
          alert("Já Existe outro Aluno com essa Matrícula!");
          this.cancelar();
          return;
        }
        if (
          prompt("Digite a Senha de Colaborador para Atualizar o Aluno") == 2006
        ) {
          this.atualizar(this.editMatricula, aluno);
          this.cancelar();
        }
      }
    }

    this.listaTabela();
  }

  pesquisar() {
    let termo = document.getElementById("pesquisar").value.toUpperCase();
    let tbody = document.getElementById("tbody");
    tbody.innerText = "";

    for (let i = 0; i < this.arrayAlunos.length; i++) {
      const aluno = this.arrayAlunos[i];
      if (
        aluno.nomeAluno.toUpperCase().includes(termo) ||
        aluno.matricula.includes(termo) ||
        aluno.faculdade.toUpperCase().includes(termo)
      ) {
        let tr = tbody.insertRow();

        let td_matricula = tr.insertCell();
        let td_nomeAluno = tr.insertCell();
        let td_cpf = tr.insertCell();
        let td_email = tr.insertCell();
        let td_curso = tr.insertCell();
        let td_faculdade = tr.insertCell();
        let td_acoes = tr.insertCell();

        td_faculdade.innerText = this.arrayAlunos[i].faculdade.toUpperCase();
        td_cpf.innerText = this.arrayAlunos[i].cpf;
        td_matricula.innerText = this.arrayAlunos[i].matricula;
        td_nomeAluno.innerText = this.arrayAlunos[i].nomeAluno.toUpperCase();
        td_email.innerText = this.arrayAlunos[i].email;
        td_curso.innerText = this.arrayAlunos[i].curso.toUpperCase();

        td_faculdade.classList.add("center");
        td_cpf.classList.add("center");
        td_matricula.classList.add("center");
        td_nomeAluno.classList.add("center");
        td_email.classList.add("center");
        td_curso.classList.add("center");
        td_acoes.classList.add("center");

        let imgEdit = document.createElement("img");
        imgEdit.src = "./img/edit.png";
        imgEdit.setAttribute(
          "onclick",
          "aluno.editar(" + JSON.stringify(this.arrayAlunos[i]) + ")"
        );

        let imgDelete = document.createElement("img");
        imgDelete.src = "./img/delete.png";
        imgDelete.setAttribute(
          "onclick",
          "aluno.deletar(" + this.arrayAlunos[i].matricula + ")"
        );

        td_acoes.appendChild(imgEdit);
        td_acoes.appendChild(imgDelete);

        this.cancelar();
      }
    }
  }

  adicionar(aluno) {
    this.arrayAlunos.push(aluno);
    this.salvarAlunos();
  }

  salvarAlunos() {
    localStorage.setItem("alunos", JSON.stringify(this.arrayAlunos));
  }

  atualizar(matriculaAntiga, alunoNovo) {
    for (let i = 0; i < this.arrayAlunos.length; i++) {
      if (this.arrayAlunos[i].matricula === matriculaAntiga) {
        this.arrayAlunos[i] = alunoNovo;
        break;
      }
    }
    this.salvarAlunos();
    alert("Aluno Atualizado!");
  }

  cancelar() {
    document.getElementById("matricula").value = "";
    document.getElementById("aluno").value = "";
    document.getElementById("email").value = "";
    document.getElementById("curso").value = "";
    document.getElementById("cpf").value = "";
    document.getElementById("faculdade").value = "";

    document.getElementById("btn1").innerText = "Salvar";
    this.editMatricula = null;
  }

  deletar(matricula) {
    let tbody = document.getElementById("tbody");

    if (prompt("Digite a Senha de Colaborador para deletar o Aluno") == 2006) {
      if (
        confirm(
          "Tem Certeza que Deseja Deletar o Aluno de Matrícula: " +
            matricula +
            "?"
        )
      ) {
        for (let i = 0; i < this.arrayAlunos.length; i++) {
          if (this.arrayAlunos[i].matricula == matricula) {
            this.arrayAlunos.splice(i, 1);
            tbody.deleteRow(i);
            alert("Aluno de Matrícula: " + matricula + " Deletado!");
          }
        }
      }
    } else {
      alert("SENHA INVÁLIDA!");
    }
    this.salvarAlunos();
  }

  editar(dados) {
    this.editMatricula = dados.matricula;

    document.getElementById("aluno").value = dados.nomeAluno;
    document.getElementById("matricula").value = dados.matricula;
    document.getElementById("email").value = dados.email;
    document.getElementById("curso").value = dados.curso;
    document.getElementById("cpf").value = dados.cpf;
    document.getElementById("faculdade").value = dados.faculdade;

    document.getElementById("btn1").innerText = "Atualizar";
  }
}

var aluno = new Aluno();
