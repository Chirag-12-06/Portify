import Section from "../../common/Section";
import { useCertificates } from "../../../hooks/useCertificates";
import CertificateCard from "./CertificateCard";
import {useNavigate} from "react-router-dom";

export default function Certificates() {

  const navigate = useNavigate();
  const { data: certificates } = useCertificates();

  return (
    <Section id="certificates" title="Certificates">
      <div>
        <div className="space-y-5">
          {certificates?.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            variant="secondary"
            onClick={() => navigate("/certificates")}
          >
            View All Certificates →
          </button>
        </div>
      </div>
    </Section>
  );
}
