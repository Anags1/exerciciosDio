function calculadora()
{
    const operacao = Number(prompt(`Escolha uma operação:\n 1- Soma \n 2 - Subtração \n 3 - Multiplicação \n 4 - Divisao Real \n 5 - Divisão Inteira \n 6 - Poteniação`));

    if (!operacao || operacao >= 7)
    {
        alert('Erro - Operação inválida');
        calculadora();
    } else
    {
        let n1 = Number(prompt('Digite o primeiro valor:'));
        let n2 = Number(prompt('Digite o segundo valor:'));
        let resultado;

        if (!n1 || !n2) 
        {
            alert('Erro - parêmetros inválidos');
            calculadora();
        } else 
        {
            function soma() 
            {
                resultado = n1 + n2;
                alert(`${n1} + ${n2} = ${resultado}`);
                novaAcao();
            }
        
            function subtracao() 
            {
                resultado = n1 - n2;
                alert(`${n1} - ${n2} = ${resultado}`);
                novaAcao();
            }
        
            function multiplicacao() 
            {
                resultado = n1 * n2;
                alert(`${n1} * ${n2} = ${resultado}`);
                novaAcao();
            }
        
            function divisaoReal() 
            {
                resultado = n1 / n2;
                alert(`${n1} / ${n2} = ${resultado}`);
                novaAcao();
            }
        
            function divisaoInteira() 
            {
                resultado = n1 % n2;
                alert(`O resto da divisão entre ${n1} e ${n2} é igual a ${resultado}`);
                novaAcao();
            }
        
            function potenciacao() 
            {
                resultado = n1 ** n2;
                alert(`${n1} elevado a ${n2}ª é igual a ${resultado}`);
                novaAcao();
            }
        
            function novaAcao() 
            {
                let opcao = prompt('Deseja realizar nova operação?\n 1 - Sim \n 2 - Não');
        
                if (opcao == 1)
                {
                    calculadora();
                } else if (opcao == 2) 
                {
                    alert('Até logo!')
                } else 
                {
                    alert('Digite uma opção válida!');
                    novaAcao();
                }
            }
        } 
    }

    if (operacao == 1)
    {
        soma();
    }

    if (operacao == 2)
    {
        subtracao();
    }

    if (operacao == 3)
    {
        multiplicacao();
    }

    if (operacao == 4)
    {
        divisaoReal();
    }

    if (operacao == 5)
    {
        divisaoInteira();
    }

    if (operacao == 6)
    {
        potenciacao();
    }
}
calculadora();