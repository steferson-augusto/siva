import { Component, OnInit } from '@angular/core'
import { FirebaseService } from '../firebase.service'
import { MatDialog } from '@angular/material'
import { MatSnackBar } from '@angular/material'
import {of} from 'rxjs';

import { AtividadeComponent } from '../modal/atividade/atividade.component'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  status: "loading" | "asynced" | "error" | "updating" | "pending" = "loading"
  con = null
  tabelas = []
  displayedColumns: string[] = ['label', 'mdo', 'insumo', 'star']
  colums: string[] = []
  selecionado = null
  indice = null
  step = null
  espacamentos = []
  displayData = []
  displayColumnsData = ["label"]
  comparacoes = []
  grafLucro
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Ano';
  showYAxisLabel = true;
  yAxisLabel = 'Valor';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  constructor(
    private fsService: FirebaseService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    
  }

  ngOnInit() {
    console.log(this.grafLucro)
    this.con = this.fsService.getTabelas()
    this.con.snapshotChanges().subscribe(data => {
      this.grafLucro = null
      this.grafLucro = []
      this.displayColumnsData = ["label"]
      this.comparacoes = []
      this.displayData = []
      const { tabelas } = data.payload.data()
      tabelas.length ? this.tabelas = tabelas : console.log('Não achou')
      let qtdArvores = []
      let qtdVolume = []
      let receita = []
      let frete = []
      let colheita = []
      let pre = []
      let plantio = []
      let manutencao = []
      let despesa = []
      let despesa5 = []
      let despesa6 = []
      let despesa7 = []
      let despesa8 = []
      let lucro = []
      let lucro5 = []
      let lucro6 = []
      let lucro7 = []
      let lucro8 = []
      const PI = 3.141516
      for (let i = 0; i < this.tabelas.length; i++) {
        let t = this.tabelas[i]
        let v = t.valores.volume
        qtdArvores[t.label] = t.valores.ha * t.valores.espacamento.total
        qtdVolume[t.label] = Math.floor(3.141516 * t.valores.diametro * t.valores.diametro / 4 * t.valores.altura * qtdArvores[t.label])
        receita[t.label] = qtdVolume[t.label] * t.valores.venda
        frete[t.label] = t.valores.frete * qtdVolume[t.label]
        colheita[t.label] = t.valores.colheita * t.valores.ha
        pre[t.label] = (this.getTotalMDO(i, 0) + this.getTotalInsumo(i, 0)) * t.valores.ha
        plantio[t.label] = (this.getTotalMDO(i, 1) + this.getTotalInsumo(i, 1)) * t.valores.ha
        manutencao[t.label] = (this.getTotalMDO(i, 2) + this.getTotalInsumo(i, 2)) * t.valores.ha
        despesa[t.label] = frete[t.label] + colheita[t.label] + pre[t.label] + plantio[t.label] + manutencao[t.label]
        lucro[t.label] = receita[t.label] - despesa[t.label]
        despesa5[t.label] = despesa[t.label] + (v[0].manutencao * t.valores.ha)
        despesa6[t.label] = despesa5[t.label] + (v[1].manutencao * t.valores.ha)
        despesa7[t.label] = despesa6[t.label] + (v[2].manutencao * t.valores.ha)
        despesa8[t.label] = despesa7[t.label] + (v[3].manutencao * t.valores.ha)
        lucro5[t.label] = (t.valores.venda * Math.floor(PI * v[0].diametro * v[0].diametro / 4 * v[0].altura * 0.5 * qtdArvores[t.label])) - despesa5[t.label]
        lucro6[t.label] = (t.valores.venda * Math.floor(PI * v[1].diametro * v[1].diametro / 4 * v[1].altura * 0.5 * qtdArvores[t.label])) - despesa6[t.label]
        lucro7[t.label] = (t.valores.venda * Math.floor(PI * v[2].diametro * v[2].diametro / 4 * v[2].altura * 0.5 * qtdArvores[t.label])) - despesa7[t.label]
        lucro8[t.label] = (t.valores.venda * Math.floor(PI * v[3].diametro * v[3].diametro / 4 * v[3].altura * 0.5 * qtdArvores[t.label])) - despesa8[t.label]

        this.displayColumnsData.push(t.label)
        this.comparacoes.push(t.label)
        this.grafLucro.push({
          name: t.label,
          series: [
            {
              name: '5º Ano',
              value: lucro5[t.label]
            },{
              name: '6º Ano',
              value: lucro6[t.label]
            },{
              name: '7º Ano',
              value: lucro7[t.label]
            },{
              name: '8º Ano',
              value: lucro8[t.label]
            },
          ]
        })
      }
      this.displayData = [
        {
          label: "Quantidade de árvores",
          comparacoes: qtdArvores,
          tipo: 'n'
        }, {
          label: "Quantidade de madeira (m³)",
          comparacoes: qtdVolume,
          tipo: 'n'
        }, {
          label: "Frete",
          comparacoes: frete,
          tipo: '-'
        }, {
          label: "Colheita",
          comparacoes: colheita,
          tipo: '-'
        }, {
          label: "Pré plantio",
          comparacoes: pre,
          tipo: '-'
        }, {
          label: "Plantio",
          comparacoes: plantio,
          tipo: '-'
        }, {
          label: "Manutenção",
          comparacoes: manutencao,
          tipo: '-'
        }, {
          label: "Despesas (5º ano)",
          comparacoes: despesa5,
          tipo: '-'
        }, {
          label: "Despesas (6º ano)",
          comparacoes: despesa6,
          tipo: '-'
        }, {
          label: "Despesas (7º ano)",
          comparacoes: despesa7,
          tipo: '-'
        }, {
          label: "Despesas (8º ano)",
          comparacoes: despesa8,
          tipo: '-'
        }, {
          label: "Lucro (5º ano)",
          comparacoes: lucro5,
          tipo: '+'
        }, {
          label: "Lucro (6º ano)",
          comparacoes: lucro6,
          tipo: '+'
        }, {
          label: "Lucro (7º ano)",
          comparacoes: lucro7,
          tipo: '+'
        }, {
          label: "Lucro (8º ano)",
          comparacoes: lucro8,
          tipo: '+'
        },
      ]

      //this.criar()
      console.log(this.displayData)
      this.status = 'asynced'
    })
    this.espacamentos['3m x 1,5m'] = {
      label: "3m x 1,5m",
      total: 2222,
      finalidade: 'Lenha, carvão, mourões e celulose'
    }

    this.espacamentos['3m x 2m'] = {
      label: "3m x 2m",
      total: 1667,
      finalidade: 'Lenha, carvão, mourões e celulose'
    }

    this.espacamentos['3m x 2,5m'] = {
      label: "3m x 2,5m",
      total: 1333,
      finalidade: 'Lenha, carvão, mourões, celulose e serraria'
    }

    this.espacamentos['3m x 3m'] = {
      label: "3m x 3m",
      total: 1111,
      finalidade: 'Celulose, carvão e serraria'
    }
  }

  setStep(index: number) {
    this.step = index
  }

  openSnackBar(message: string, action: string) {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 2000,
    })
    return snackBarRef
  }

  criar() {
    this.tabelas.push(this.tabelas[0])
    const con = this.fsService.getTabelas()
    con.update({ tabelas: this.tabelas })
  }

  selecionar(i, j, k) {
    this.selecionado = this.tabelas[i].etapas[j].atividades[k]
    this.indice = { i, j, k }
    this.step = i
  }

  addAtividade(i, j) {
    const dialogRef = this.dialog.open(AtividadeComponent, {
      height: '415px',
      width: '300px',
      data: { action: 'ADICIONAR ATIVIDADE', label: '', mdo: '', insumo: '' }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!result.mdo) result.mdo = 0
        if (!result.insumo) result.insumo = 0
        delete result.action
        this.tabelas[i].etapas[j].atividades.push(result)
        this.con.update({ tabelas: this.tabelas })
      }
    })
  }

  editarAtividade() {
    const { label, mdo, insumo } = this.selecionado
    const dialogRef = this.dialog.open(AtividadeComponent, {
      height: '415px',
      width: '300px',
      data: { action: 'EDITAR ATIVIDADE', label, mdo, insumo }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (!result.mdo) result.mdo = 0
        if (!result.insumo) result.insumo = 0
        const { i, j, k } = this.indice
        delete result.action
        this.tabelas[i].etapas[j].atividades[k] = result
        this.con.update({ tabelas: this.tabelas })
      }
    })
  }

  delAtividade() {
    const { i, j, k } = this.indice
    const deleted = this.tabelas[i].etapas[j].atividades.splice(k, 1)
    this.con.update({ tabelas: this.tabelas })
    const snackBarRef = this.openSnackBar('Item excluído com sucesso!', 'Desfazer')
    snackBarRef.onAction().subscribe(() => {
      this.undoDelAtividade(deleted[0], this.indice)
    })
  }

  undoDelAtividade(atividade, indices) {
    const { i, j, k } = indices
    this.tabelas[i].etapas[j].atividades.splice(k, 0, atividade)
    this.con.update({ tabelas: this.tabelas })
  }

  getTotalMDO(i, j) {
    return this.tabelas[i].etapas[j].atividades.map(e => e.mdo).reduce((total, valor) => total + valor, 0)
  }

  getTotalInsumo(i, j) {
    return this.tabelas[i].etapas[j].atividades.map(e => e.insumo).reduce((total, valor) => total + valor, 0)
  }

  ff(e, i) {
    this.tabelas[i].valores.espacamento = this.espacamentos[e.value]
    // precisa salvar
  }

}
