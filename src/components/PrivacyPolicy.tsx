import { Box, Heading, Link, Text } from "@chakra-ui/react";
import { themeVariables } from "@/styles/themeVariables";

export const PrivacyPolicy = () => {
  return (
    <Box width="100%" px={{ base: 4, md: 6 }} py={{ base: 8, md: 12 }}>
      <Box
        bg="white"
        borderRadius="16px"
        maxWidth="900px"
        mx="auto"
        p={{ base: 6, md: 10 }}
        color={themeVariables.dark}
        boxShadow="0 6px 18px rgba(0,0,0,0.08)"
      >
        <Box display="flex" flexDirection="column" gap={4}>
          <Heading size="lg">Privacy Policy</Heading>
          <Text fontWeight="600">Effective Date: February 3, 2026</Text>
          <Text>
            Noggles (“the App”) is a minimal utility application designed to provide access
            to the noggles symbol through a tap-to-copy interface and an optional system
            keyboard extension.
          </Text>
          <Text>
            We take user privacy seriously and intentionally designed Noggles to operate
            without collecting, storing, or transmitting personal data.
          </Text>

          <Text fontWeight="600">Information We Collect</Text>
          <Text>Noggles does not collect any personal information.</Text>
          <Text>Specifically:</Text>
          <Box as="ul" pl={6} display="flex" flexDirection="column" gap={1} listStyleType="disc">
            <Box as="li">We do not collect names, email addresses, phone numbers, or identifiers</Box>
            <Box as="li">We do not collect analytics or usage data</Box>
            <Box as="li">We do not collect device information</Box>
            <Box as="li">We do not collect location data</Box>
          </Box>

          <Text fontWeight="600">Keyboard Extension</Text>
          <Text>The Noggles keyboard extension:</Text>
          <Box as="ul" pl={6} display="flex" flexDirection="column" gap={1} listStyleType="disc">
            <Box as="li">Does not record keystrokes</Box>
            <Box as="li">Does not store any text you type</Box>
            <Box as="li">Does not transmit data over the network</Box>
            <Box as="li">Does not require or request “Full Access”</Box>
          </Box>
          <Text>
            The keyboard functions entirely on-device and only inserts the noggles symbol
            when the user explicitly taps the key.
          </Text>

          <Text fontWeight="600">Clipboard Usage</Text>
          <Text>
            When you tap to copy the noggles symbol, the App places the symbol on the
            system clipboard at your request. The App does not access, read, store, or
            transmit clipboard contents beyond this user-initiated action.
          </Text>

          <Text fontWeight="600">Data Sharing</Text>
          <Text>Noggles does not share data with third parties.</Text>
          <Text>There are:</Text>
          <Box as="ul" pl={6} display="flex" flexDirection="column" gap={1} listStyleType="disc">
            <Box as="li">No advertising partners</Box>
            <Box as="li">No analytics providers</Box>
            <Box as="li">No external services or SDKs</Box>
          </Box>

          <Text fontWeight="600">Data Storage</Text>
          <Text>Noggles does not store user data locally or remotely.</Text>

          <Text fontWeight="600">Children’s Privacy</Text>
          <Text>Noggles does not knowingly collect any information from children under the age of 13.</Text>

          <Text fontWeight="600">Security</Text>
          <Text>
            Because Noggles does not collect or store user data, there is no user data at
            risk of breach or misuse.
          </Text>

          <Text fontWeight="600">Changes to This Policy</Text>
          <Text>
            If the functionality of the App changes in a way that affects privacy, this
            policy will be updated accordingly. Any changes will be reflected on this
            page with an updated effective date.
          </Text>

          <Text fontWeight="600">Contact</Text>
          <Text>If you have questions about this Privacy Policy, you can contact us at:</Text>
          <Text>Contact: <Link href="https://x.com/nounsdoteth">@nounsdoteth</Link></Text>
          <Text>
            Website:{" "}
            <Link href="https://noggles.domains" target="_blank" rel="noreferrer">
              https://noggles.domains
            </Link>
          </Text>

          <Text fontWeight="600">Apple App Store Privacy Disclosure Alignment</Text>
          <Text>Noggles aligns with Apple’s App Store privacy guidelines and qualifies as:</Text>
          <Box as="ul" pl={6} display="flex" flexDirection="column" gap={1} listStyleType="disc">
            <Box as="li">No data collected</Box>
            <Box as="li">No data shared</Box>
            <Box as="li">No tracking</Box>
            <Box as="li">On-device processing only</Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
