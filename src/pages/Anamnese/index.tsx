import React, { useState, useCallback, useRef, useEffect } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Paper from '@material-ui/core/Paper';

import { useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/Toast';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, InfoContainer, FormContainer, TabSection } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';
import TextArea from '../../components/TextArea';

interface AnamneseFormData {
  clientID: number;
  motherName: string;
  motherAliveBool: boolean;
  fatherName: string;
  fatherAliveBool: boolean;
  haveChildrenBool: boolean;
  childrensName: string;
  haveBrothersBool: boolean;
  brothersName: string;
  family: string;
  childhood: string;
  adolescence: string;
  marriage: string;
  relationship: string;
  sexuality: string;
  alcoholProblemsBool: boolean;
  smokeBool: boolean;
  sleepQuality: string;
  alreadyHipnotizedBool: boolean;
  believeHipnotizedBool: boolean;
  alreadyTreatedEmotionalProblemBool: boolean;
  diabeticBool: boolean;
  epilepsyBool: boolean;
  heartProblemsBool: boolean;
  labyrinthitisBool: boolean;
  medicalFollowUpLastYearBool: boolean;
  medicineBool: boolean;
  previousEffortBool: boolean;
  prolongedIllnessBool: boolean;
  questionAboutHypnosis: string;
  medicalFollowUp: string;
  takesMedicine: string;
  whyThisIsProblem: string;
  wouldLikeToFeel: string;
  somethingWouldLikeToDo: string;
  disease: string;
}

interface ClientData {
  clientID: number;
  motherName: string;
  motherAlive: number;
  fatherName: string;
  fatherAlive: number;
  haveChildren: number;
  childrensName: string;
  haveBrothers: number;
  brothersName: string;
  family: string;
  childhood: string;
  adolescence: string;
  marriage: string;
  relationship: string;
  sexuality: string;
  alcoholProblems: number;
  smoke: number;
  sleepQuality: string;
  alreadyHipnotized: number;
  believeHipnotized: number;
  alreadyTreatedEmotionalProblem: number;
  diabetic: number;
  epilepsy: number;
  heartProblems: number;
  labyrinthitis: number;
  medicalFollowUpLastYear: number;
  medicine: number;
  previousEffort: number;
  prolongedIllness: number;
  questionAboutHypnosis: string;
  medicalFollowUp: string;
  takesMedicine: string;
  whyThisIsProblem: string;
  wouldLikeToFeel: string;
  somethingWouldLikeToDo: string;
  disease: string;
}

const Anamnese: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const [clientidActual, setClientidActual] = useState<number>();
  const { addToast } = useToast();
  const [clientName, setClientName] = useState('');
  const [haveChildrens, setHaveChildren] = useState(false);
  const [haveBrothers, setHaveBrothers] = useState(false);

  const handleSubmit = useCallback(
    async (data: AnamneseFormData) => {
      try {
        formRef.current?.setErrors({});

        const clientIDUrl = parseInt(
          history.location.pathname.split('/')[2],
          10,
        );

        const clientData: ClientData = {
          ...data,
          motherAlive: data.motherAliveBool ? 1 : 0,
          fatherAlive: data.fatherAliveBool ? 1 : 0,
          haveChildren: data.haveChildrenBool ? 1 : 0,
          haveBrothers: data.haveBrothersBool ? 1 : 0,
          alcoholProblems: data.alcoholProblemsBool ? 1 : 0,
          smoke: data.smokeBool ? 1 : 0,
          alreadyHipnotized: data.alreadyHipnotizedBool ? 1 : 0,
          believeHipnotized: data.believeHipnotizedBool ? 1 : 0,
          alreadyTreatedEmotionalProblem: data.alreadyTreatedEmotionalProblemBool
            ? 1
            : 0,
          diabetic: data.diabeticBool ? 1 : 0,
          epilepsy: data.epilepsyBool ? 1 : 0,
          heartProblems: data.heartProblemsBool ? 1 : 0,
          labyrinthitis: data.labyrinthitisBool ? 1 : 0,
          medicalFollowUpLastYear: data.medicalFollowUpLastYearBool ? 1 : 0,
          medicine: data.medicineBool ? 1 : 0,
          previousEffort: data.previousEffortBool ? 1 : 0,
          prolongedIllness: data.prolongedIllnessBool ? 1 : 0,
          clientID: clientIDUrl,
        };

        await api.post('Anamnesis', clientData);

        addToast({
          title: 'Sucesso',
          description: 'Anamnese salva!',
          type: 'success',
        });
      } catch (err) {
        addToast({
          title: 'Erro na autentica????o',
          description:
            'Ocorreu um erro ao atualizar a anamnese, verifique as informa????es',
          type: 'error',
        });
      }
    },
    [addToast],
  );

  useEffect(() => {
    let id = 0;

    async function getFormData() {
      const response = await api.get(
        `Anamnesis/${history.location.pathname.split('/')[2]}`,
      );

      const dataFormClient: AnamneseFormData = response.data[0];

      if (dataFormClient) {
        setHaveChildren(dataFormClient.haveChildrenBool);
        setHaveBrothers(dataFormClient.haveBrothersBool);
      }

      formRef.current?.setData({ ...dataFormClient });
    }

    if (history.location.pathname.split('/')[2]) {
      id = parseInt(history.location.pathname.split('/')[2], 10);

      setClientidActual(id);

      getFormData();
    }

    api
      .get(`Client/${history.location.pathname.split('/')[2]}`)
      .then(response => {
        setClientName(response.data[0].name);
      });
  }, [clientidActual, history]);

  const handleHaveChildren = useCallback(() => {
    setHaveChildren(!haveChildrens);
  }, []);

  const handleHaveBrothers = useCallback(() => {
    setHaveBrothers(!haveBrothers);
  }, []);

  return (
    <Container>
      <Header />
      {/* <SideBar /> */}

      <InfoContainer>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <FormContainer>
            <Paper square={false} elevation={5}>
              <div>
                <h1>{clientName}</h1>
                <div>
                  <Button type="button" className="button-c">
                    Imprimir
                  </Button>
                  <Button type="submit" title="Salvar cliente">
                    Salvar
                  </Button>
                </div>
              </div>
              <TabSection>
                <TextArea
                  name="reasonsHypnosis"
                  placeholder="Motivos para buscar ajuda com hipnose"
                  label="Motivos para buscar Hipnose"
                />
              </TabSection>
              <br />
              <TabSection>
                <TextArea
                  name="whyThisIsProblem"
                  placeholder="Por que que isso ?? um problema pra voc???"
                  label="Por que que isso ?? um problema pra voc???"
                />
              </TabSection>
              <br />
              <TabSection>
                <TextArea
                  name="worseThingProblemGoesAway"
                  placeholder="Qual seria a pior coisa que poderia acontecer se seu problema/sintoma desaparecesse?"
                  label="Pior coisa se o problema desaparecesse"
                />
              </TabSection>
              <br />
              <TabSection>
                <TextArea
                  name="somethingWouldLikeToDo"
                  placeholder="Tem alguma coisa que voc?? gostaria de fazer e n??o faz mais?"
                  label="Tem alguma coisa que voc?? gostaria de fazer e n??o faz mais?"
                />
              </TabSection>
              <br />
              <TabSection>
                <TextArea
                  name="wouldLikeToFeel"
                  placeholder="Como voc?? gostaria de se sentir?"
                  label="Como voc?? gostaria de se sentir?"
                />
              </TabSection>
              <br />
              <TabSection>
                <TextArea name="family" placeholder="Fam??lia" label="Fam??lia" />
              </TabSection>
              <br />
              <TabSection>
                <TextArea
                  name="childhood"
                  placeholder="Inf??ncia"
                  label="Inf??ncia"
                />
              </TabSection>
              <br />
              <TabSection>
                <TextArea
                  name="adolescence"
                  placeholder="Adolesc??ncia"
                  label="Adolesc??ncia"
                />
              </TabSection>
              <br />
              <TabSection>
                <TextArea
                  name="marriage"
                  placeholder="Casamento"
                  label="Casamento"
                />
              </TabSection>
              <br />
              <TabSection>
                <TextArea
                  name="relationship"
                  placeholder="Rela????es"
                  label="Rela????es"
                />
              </TabSection>
              <br />
              <TabSection>
                <TextArea
                  name="sexuality"
                  placeholder="Sexualidade"
                  label="Sexualidade"
                />
              </TabSection>
              <br />
              <TabSection>
                <TextArea
                  name="sleepQuality"
                  placeholder="Qualidade do Sono"
                  label="Qualidade do Sono"
                />
              </TabSection>
              <br />
              <TabSection>
                <TextArea
                  name="medicalFollowUp"
                  placeholder="Acompanhamento m??dico/emocional recentemente"
                  label="Teve algum acompanhamento m??dico/emocional recentemente?"
                />
              </TabSection>
              <br />
              <TabSection>
                <TextArea
                  name="takesMedicine"
                  placeholder="Medicamentos"
                  label="Medicamentos"
                />
              </TabSection>
              <br />
              <TabSection>
                <TextArea
                  name="disease"
                  placeholder="Doen??as"
                  label="Doen??as"
                />
              </TabSection>
              <br />
              <TabSection>
                <CheckBox
                  name="alcoholProblemsBool"
                  label="Problemas com ??lcool/drogas?"
                />
              </TabSection>
              <br />
              <TabSection>
                <CheckBox name="smokeBool" label="Fuma?" />
              </TabSection>
              <br />
              <TabSection>
                <CheckBox
                  name="prolongedIllnessBool"
                  label="J?? teve alguma doen??a prolongada?"
                />
              </TabSection>
              <br />
              <TabSection>
                <CheckBox
                  name="heartProblemsBool"
                  label="J?? teve problemas card??acos?"
                />
              </TabSection>
              <br />
              <TabSection>
                <CheckBox name="diabeticBool" label="?? diab??tico?" />
              </TabSection>
              <br />
              <TabSection>
                <CheckBox
                  name="epilepsyBool"
                  label="Ocorr??ncia de epilepsia?"
                />
              </TabSection>
              <br />
              <TabSection>
                <CheckBox
                  name="labyrinthitisBool"
                  label="Possui labirintite?"
                />
              </TabSection>
              {/* <br />
              <TabSection>
                <CheckBox name="medicineBool" label="Toma algum medicamento?" />
              </TabSection> */}
              <br />
              <TabSection>
                <Input
                  name="motherName"
                  placeholder="Nome da m??e"
                  label="Nome da m??e"
                />
                <CheckBox name="motherAliveBool" label="Viva?" />
              </TabSection>
              <br />
              <TabSection>
                <Input
                  name="fatherName"
                  placeholder="Nome do pai"
                  label="Nome do pai"
                />
                <CheckBox name="fatherAliveBool" label="Vivo?" />
              </TabSection>
              <br />
              <TabSection>
                <CheckBox
                  name="haveChildrenBool"
                  label="Filhos"
                  onChange={handleHaveChildren}
                />
              </TabSection>
              <br />
              {haveChildrens && (
                <>
                  <TabSection>
                    <Input name="childrensName" placeholder="Filhos" />
                  </TabSection>
                  <br />
                </>
              )}
              <TabSection>
                <CheckBox
                  name="haveBrothersBool"
                  label="Irm??os"
                  onChange={handleHaveBrothers}
                />
              </TabSection>
              <br />
              {haveBrothers && (
                <>
                  <TabSection>
                    <Input name="brothersName" placeholder="Irm??os" />
                  </TabSection>
                  <br />
                </>
              )}
              {/* <br />
              <TabSection>
                <TextArea
                  name="questionAboutHypnosis"
                  placeholder="Tem alguma pergunta sobre hipnose?"
                  label="Pergunta sobre hipnose"
                />
              </TabSection> */}
            </Paper>
          </FormContainer>
        </Form>
      </InfoContainer>
    </Container>
  );
};

export default Anamnese;
