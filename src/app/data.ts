interface Etapa {
    label: string;
    mdo: number;
    insumo: number;
}

export interface Config {
    label: string;
    atividades: Etapa[]
}

const config: Config[] = [
    {
        label: 'Pré-plantio',
        atividades: [{
            label: 'Controle de formigas',
            mdo: 15,
            insumo: 10
        },{
            label: 'Correção do solo',
            mdo: 50,
            insumo: 135
        },{
            label: 'Construção de bacias de retenção',
            mdo: 90,
            insumo: 0
        },{
            label: 'Controle de daninhas',
            mdo: 73,
            insumo: 43
        },{
            label: 'Subsolagem c/ adubação de base',
            mdo: 130,
            insumo: 0
        },{
            label: 'Subsolagem s/ adubação de base',
            mdo: 100,
            insumo: 0
        }]
    }
]