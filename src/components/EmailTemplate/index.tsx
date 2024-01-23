import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import { getUrl } from "src/queryFn";

interface EmailTemplateProps {
  username?: string;
  uri: string;
}

export const EmailTemplate = ({ username, uri }: EmailTemplateProps) => {
  return (
    <Html>
      <Preview>Join on E-Learning</Preview>
      <Head />
      <Tailwind>
        <Body className="bg-[#FAF7F5] my-auto mx-auto font-sans">
          <Container className="border-2 border-solid border-[#E7E2DF] bg-[#FAF7F5]  rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-[#291334] text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Join on <strong>E-Learning</strong>
            </Heading>
            <Text className="text-[#291334] text-[14px] leading-[24px]">
              Hello {username}
            </Text>
            <Text className="text-[#291334] text-[14px] leading-[24px]">
              To authorize your email click the{" "}
              <strong>&quot;Authorize&quot;</strong> button
            </Text>
            <Section className="text-center mt-[24px] mb-[24px]">
              <Button
                className="bg-[#65C3C8] p-3 rounded text-[#FAF7F5] text-[16px] font-semibold no-underline text-center"
                href={getUrl + uri}
              >
                Authorize
              </Button>
            </Section>
            <Text className="text-[#291334] text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              <Link href={getUrl + uri} className="text-blue-600 no-underline">
                {getUrl}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#E7E2DF] my-[26px] mx-0 w-full" />
            <Text className="text-[#D0CAD3] text-[12px] leading-[24px]">
              This invitation was intended for{" "}
              <span className="text-black">{username} </span>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailTemplate;
