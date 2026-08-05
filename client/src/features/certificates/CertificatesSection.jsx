import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Section from "../../shared/components/ui/Section";
import Button from "../../shared/components/ui/Button";
import { useFeaturedCertificates } from "./hooks/useCertificates";
import CertificateCard from "./components/CertificateCard";

export default function Certificates() {
  const navigate = useNavigate();
  const { data: certificates } = useFeaturedCertificates();

  return (
    <Section id="certificates" title="Certificates">
      <div>
        <div className="space-y-5">
          {certificates?.map((certificate) => (
            <CertificateCard key={certificate.id} certificate={certificate} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            variant="secondary"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => navigate("/certificates")}
          >
            View All Certificates
          </Button>
        </div>
      </div>
    </Section>
  );
}
