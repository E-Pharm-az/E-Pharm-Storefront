import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const AboutUsPage: React.FC = () => {
  const { t } = useTranslation("global");

  const faqItems = [
    { question: "deliveryTime", answer: "deliveryTimeAnswer" },
    { question: "deliveryCharges", answer: "deliveryChargesAnswer" },
    { question: "outsideHours", answer: "outsideHoursAnswer" },
    { question: "trackOrder", answer: "trackOrderAnswer" },
    { question: "paymentMethods", answer: "paymentMethodsAnswer" },
    { question: "notAtHome", answer: "notAtHomeAnswer" },
    { question: "minimumOrder", answer: "minimumOrderAnswer" },
    { question: "cancelOrder", answer: "cancelOrderAnswer" },
    { question: "returnsExchanges", answer: "returnsExchangesAnswer" },
    { question: "customerSupport", answer: "customerSupportAnswer" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t("aboutUs.title")}</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("aboutUs.aboutEPharm")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t("aboutUs.description")}</p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("aboutUs.faq")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{t(`faq.${item.question}`)}</AccordionTrigger>
                <AccordionContent>{t(`faq.${item.answer}`)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{t("aboutUs.deliveryRules")}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t("aboutUs.deliveryRulesContent")}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("aboutUs.howToOrder")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside">
            <li>{t("aboutUs.orderStep1")}</li>
            <li>{t("aboutUs.orderStep2")}</li>
            <li>{t("aboutUs.orderStep3")}</li>
            <li>{t("aboutUs.orderStep4")}</li>
            <li>{t("aboutUs.orderStep5")}</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUsPage;
