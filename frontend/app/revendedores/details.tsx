import React, { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { View } from "react-native";
import FormSteps, { FormStep } from "../../components/forms/FormSteps";
import RevendedorFormDadosPessoais, { FormPessoalData } from "../../components/revendedores/RevendedorFormDadosPessoais";
import RevendedorFormEndereco, { FormEnderecoData } from "../../components/revendedores/RevendedorFormEndereco";
import RevendedorFormFiador, { FormFiadorData } from "../../components/revendedores/RevendedorFormFiador";
import { Stack } from "expo-router";

export default function RevendedorForm() {
  const formDadosPessoais = useForm<FormPessoalData>({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: { nome: "", email: "", cel1: "", cel2: "", telefone: "" },
    shouldFocusError: true,
  });
  const formEndereco = useForm<FormEnderecoData>({
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });
  const formFiador = useForm<FormFiadorData>({
    mode: "all",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const onSubmit = (data: FormPessoalData | FormEnderecoData | FormFiadorData) => {
    console.log("Data: ", data);
  };

  const handleValidation = async (
    form: UseFormReturn<FormPessoalData> | UseFormReturn<FormEnderecoData> | UseFormReturn<FormFiadorData>
  ) => {
    const _a = form.formState.errors; //Have no reasons, only works
    await form.trigger();
    return form.formState.isValid;
  };

  const steps: FormStep[] = [
    {
      subTitle: "Dados Pessoais",
      component: <RevendedorFormDadosPessoais form={formDadosPessoais} />,
      canNext: async () => await handleValidation(formDadosPessoais),
    },
    {
      subTitle: "Endereço",
      component: <RevendedorFormEndereco form={formEndereco} />,
      canNext: async () => await handleValidation(formEndereco),
    },
    {
      subTitle: "Fiador",
      component: <RevendedorFormFiador form={formFiador} />,
      canNext: async () => await handleValidation(formFiador),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* <Stack.Screen options={{ presentation: "modal", headerShown: false }} /> */}
      <FormSteps
        title="Novo Revendedor"
        steps={steps}
        onFinish={() => {
          console.clear();
          console.log("===== SUBMIT/FINALIZAR =====");
          console.log(formDadosPessoais.getValues());
          console.log(formEndereco.getValues());
          console.log(formFiador.getValues());
        }}
      />
    </View>
  );
}
