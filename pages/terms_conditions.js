import { Box, Text, chakra } from "@chakra-ui/react";
import BackgroundTitle from "../components/BackgroundTitle";
import FooterComponent from "../components/Footer";
import NavBar from "../components/NavBar";
import Footer3 from "../components/homepage/Footer3";

const TermsConditions = () => {
  return (
    // <Box>
    // <NavBar />
    // <BackgroundTitle longbit="Terms & Condit" shortbit="ions" />
    // <Box margin="auto" px={{ base: ".5rem", md: "2rem" }} py="2rem">
    //   <Text
    //     w="90%"
    //     textTransform={"uppercase"}
    //     margin={"auto"}
    //     fontWeight={700}
    //     fontSize="1.75rem"
    //     fontFamily={"poppins"}
    //   >
    //     Terms of Service
    //   </Text>
    //   <Text
    //     w="90%"
    //     margin="auto"
    //     fontFamily={"poppins"}
    //     fontSize={{base: '1rem', md: '1.3rem'}}
    //     pb="1rem"
    //     lineHeight={"2rem"}
    //   >
    //     Welcome to Nairaboom, Africa’s Pioneer Fintech Bingo Service provided
    //     by MachinePush Limited (&quot;MachinePush&quot; or &quot;We&quot;), a
    //     private limited liability company registered with the CAC under laws
    //     of the Federal Republic Of Nigeria.
    //   </Text>
    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //       lineHeight={"2rem"}
    //     >
    //       {" "}
    //       <Text fontWeight={700}>
    //         1.0 Acceptance of the Terms and Conditions of Use{" "}
    //       </Text>{" "}
    //       Please read the following Terms of Service carefully. By opting into
    //       this platform, you are agreeing to these Terms of Service. By opting
    //       in or requesting to play NairaBoom games either on any designated web
    //       application, mobile app or terminal made available to you, you hereby
    //       (i) acknowledge that you agree to be bound to and abide by these terms
    //       and conditions of use and (ii) represent and warrant that you are
    //       eligible to access the service and are authorized and able to accept
    //       these terms and conditions of use. If you do not wish to be bound by
    //       these terms and conditions of use, you must NOT opt in, signup,
    //       request for, play a game, access or use the service.
    //     </Text>
    // <Text
    //   w="90%"
    //   margin="auto"
    //   fontFamily={"poppins"}
    //   fontSize={{base: '1rem', md: '1.3rem'}}
    //   pb="2rem"
    //   lineHeight={"2rem"}
    // >
    //       <Text fontWeight={700}>
    //         2.0 General Rules, Policies & Procedures <br /> Eligibility
    //       </Text>{" "}
    //       To be eligible you must (i) possess and operate a valid nigerian bank
    //       account replete with a valid debit or credit alert. you must, at the
    //       time of registration(i) be at least eighteen (18) years of age or the
    //       age of majority in your jurisdiction of residence, whichever is
    //       greater, (ii) be physically located in a state in the federal republic
    //       of nigeria (iii) at all times abide by these terms and conditions of
    //       use. The company reserves the right to verify your age, identity and
    //       eligibility at any time. Any failure to cooperate with the company in
    //       this respect may result in the forfeiture of your winnings. Employees,
    //       officers, directors, members, managers, investors, agents, and
    //       representatives of the company and any of its or their parent
    //       companies, subsidiaries, affiliates as well as direct technology
    //       vendors, content providers, component suppliers (both hardware and
    //       software) directly related to the company, and each of their
    //       respective immediate family (defined as parents, spouse, partner, and
    //       children) and any person residing in the same household are not
    //       eligible to use the service. such persons may, however, access the
    //       service, and will from time to time do so for the purpose of testing
    //       the service, including, without limitation, evaluating user
    //       experience, and other reasonable and fair uses at the sole discretion
    //       of the company. By accessing or using the service, you represent and
    //       warrant that you have the right, authority and capacity to enter into
    //       this agreement, to abide by all of these terms and conditions of use,
    //       and that you are not prohibited from accessing or using the service.
    //       the company makes no representations or warranties, implicit or
    //       explicit, as to your legal right to access or use the service and no
    //       person affiliated, or claiming affiliation, with the company shall
    //       have authority to make any such representations or warranties. the
    //       company reserves the right to deny access to the service to anyone at
    //       its sole discretion.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //       lineHeight={"2rem"}
    //     >
    //       <Text fontWeight={700}>3.0 Compliance</Text> You will comply with all
    //       of the terms and conditions of this agreement and all applicable laws,
    //       regulations and rules when you use the service. a user must be 18
    //       years or older to participate in the service. these rules & policies
    //       are valid only where legal. you are responsible for ensuring that it
    //       is legal for you to enter the service in your local jurisdiction. the
    //       company reserves the right to cancel a user’s entry if behaviour is
    //       deemed unacceptable by machinepush nigeria limited or any of our
    //       affiliates. in the event of any winning generated from an account
    //       which is not in strict compliance of the present terms and conditions
    //       of use, the rights to said winning may be compromised.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //       lineHeight={"2rem"}
    //     >
    //       <Text fontWeight={700}>Notice of Modifications or Changes</Text> The
    //       company may modify the service at any time with or without notice to
    //       you. the company and its content including, without limitation, the
    //       information, graphics, products, features, functionality, services,
    //       and links (collectively the “content”) may be changed, deleted or
    //       updated without notice. machine push may discontinue, suspend or
    //       modify the service at any time without notice, and the company may
    //       block, terminate or suspend your access to the service at any time for
    //       any reason in its sole discretion, even if access continues to be
    //       allowed to others.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>Stakes</Text> All “clock in’s” must be made
    //       before 11.55 am & 11.55 pm daily to be eligible for considerations of
    //       any of the two time stamps daily or 11.55 pm for one daily time stamp.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text lineHeight={"2rem"} fontWeight={700}>
    //         Payouts & Statutory Withholdings
    //       </Text>{" "}
    //       Where applicable by law, the company will subject the payment of any
    //       withholding instruction to the statutory withholdings and / or
    //       deductions authority.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>Winning limits</Text> The maximum payout is NGN
    //       30,000,000 unless otherwise stated.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>Daily Entry Limit</Text> A person may stake as
    //       many times as they desire in a day.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>No Transfer</Text> Winnings are not
    //       transferable.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>Winnings Tenure</Text> All winnings will be
    //       valid only for credit or debit alerts not older than 90 days.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>Entry Commitment</Text>Once a stake has been
    //       made it cannot be reversed or terminated and will be considered.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>Security</Text>Privacy and personal security of
    //       user’s sensitive information like passwords, pins are responsibilities
    //       of the user.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>Indemnification</Text>MachinePush ,Nairaboom
    //       and all its attendant affiliations are indemnified in event of any
    //       fraudulent activity or loss to your bank account during the duration
    //       of the service
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text lineHeight={"2rem"} fontWeight={700}>
    //         Updates
    //       </Text>
    //       From time to time, the company may in its sole discretion develop and
    //       provide updates, which may include upgrades, bug fixes, patches and
    //       other error corrections and/or new features/processes (collectively,
    //       including related documentation, “Updates”). updates may also modify
    //       or delete in their entirety certain processes, features and
    //       functionality. you agree that the company has no obligation to provide
    //       any updates or to continue to provide or enable any particular
    //       features or functionality.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //       lineHeight={"2rem"}
    //     >
    //       <Text fontWeight={700}>Mobile Device and Service Charges</Text>For
    //       users who will be opting in via the internet note that this may
    //       require communication with the company’s servers, including, without
    //       limitation, which may consume data. you acknowledge and agree that you
    //       are solely responsible for any charges incurred with your data/mobile
    //       service provider as a result of use of this service, including any
    //       overage and penalties assessed for exceeding the limits imposed by
    //       your service provider. You are responsible for the cost of your mobile
    //       device and to ensure that your mobile device meets the system
    //       requirements apt for accessing this platform if you choose to access
    //       it from the web including obtaining periodic updates or upgrades from
    //       your mobile device service provider to continue accessing the web.
    //       <br /> THE COMPANY DOES NOT WARRANT OR GUARANTEE THAT WEB APP WILL BE
    //       COMPATIBLE OR FUNCTION WITH ANY PARTICULAR MOBILE DEVICE, NOR DOES THE
    //       COMPANY WARRANT OR ACCEPT ANY LIABILITY FOR OPERATION OF THE MOBILE
    //       DEVICE USED TO ACCESS OUR WEB OR SMS/USSD APPLICATION.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>Term and Termination</Text>The term and
    //       condition of your use of this service commences when you clock in an
    //       alert and accept these terms and conditions of use and will continue
    //       in effect for the duration of the service or otherwise stated
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //       lineHeight={"2rem"}
    //     >
    //       <Text fontWeight={700}>3.0 Your Nairaboom Account</Text>3.1 All
    //       applicants must be over 18 years of age to place a stake or register
    //       on Nairaboom. Nairaboom reserves the right to ask for proof of age
    //       from any customer and suspend their account until satisfactory
    //       documentation is provided. Nairaboom takes its responsibilities in
    //       respect of under-age gambling very seriously. <br />
    //       3.2 All information supplied when registering with the platform MUST
    //       be accurate and complete in all respects. In particular, if using a
    //       credit or debit card, the cardholder’s name MUST be the same as the
    //       name used when registering with the platform. Where this is not the
    //       case, the relevant account will be suspended. Where an account is
    //       suspended, the relevant customer should contact us. All stakes that
    //       are placed prior to an account being suspended will stand - win or
    //       lose. <br />
    //       3.3 Nairaboom may confirm a customer’s address by posting an address
    //       verification letter to the customer. When such correspondence is
    //       initiated, all offers and withdrawal requests may remain pending until
    //       the address has been confirmed as correct. <br />
    //       3.4 By accepting the Terms and/or registering to use the platform you
    //       hereby agree that we shall be entitled to conduct any and all such
    //       identification, credit and other verification checks from time to time
    //       that we may require and/or are required by applicable laws and
    //       regulations and/or by the relevant regulatory authorities for use of
    //       the service and our products generally. You agree to provide all such
    //       information as we require in connection with such verification checks.
    //       We shall be entitled to suspend or restrict your account in any manner
    //       that we may deem in our absolute discretion to be appropriate, until
    //       such time as the relevant checks are completed to our satisfaction.{" "}
    //       <br />
    //       3.5 As part of the registration process, we may supply your
    //       information details to authorised credit reference agencies to confirm
    //       your identity. You agree that we may process such information in
    //       connection with your registration. <br />
    //       3.6 Customers may open only one account. Should we identify any
    //       customer with more than one account we reserve the right to close or
    //       suspend any such customer and Nairaboom shall also be entitled to
    //       withhold and/or retain any and all amounts which would otherwise have
    //       been paid or payable to you (including any winnings or bonus
    //       payments). <br />
    //       3.7 Customers must keep their registration and account details up to
    //       date. <br />
    //       3.8 Nairaboom allows all its customers to choose their own username
    //       and password combination when creating an account. Customers must keep
    //       this information confidential as you are responsible for all stakes
    //       placed on your account and any other activities taking place on your
    //       account. <br />
    //       3.9 Stakes will stand if your username and password have been entered
    //       correctly (whether or not authorised by you), subject to there being
    //       sufficient funds in the account. <br />
    //       3.10 If, at any time, you feel a third party is aware of your user
    //       name and/or password you should change it immediately via the Platform
    //       or contact customer care. <br />
    //       3.11 You are responsible for all transactions where your name and
    //       account number or name and username are correctly quoted (whether or
    //       not authorised by you). If you nominate another person as an
    //       authorised user of your account, you shall be responsible for all
    //       transactions such person makes using the relevant account details.
    //       Should you lose your account details or feel that someone else may
    //       have your account details, please contact us.
    //       <br />
    //       3.12 Please note that we will never request your credit /debit card
    //       details and any other sensitive data via phone or email. Should you
    //       encounter a request like this, please contact our customer care by
    //       sending an email to support@nairaboom.ng <br />
    //       3.13 The current balance and transaction history of your account may
    //       be viewed at any time once you have logged into your account on the
    //       platform. <br />
    //       3.14 Your personal information is processed in accordance with our
    //       Privacy Policy. <br />
    //       3.15 Nairaboom reserves the right to close or suspend your account at
    //       any time and for any reason. Without limiting the preceding sentence,
    //       Nairaboom shall be entitled to close or suspend your account if:{" "}
    //       <br />
    //       (a) you become bankrupt; <br />
    //       (b) Nairaboom considers that you have used the platform in a
    //       fraudulent manner or for illegal and/or unlawful or improper purposes;{" "}
    //       <br />
    //       (c) Nairaboom considers that you have used the platform in an unfair
    //       manner or have deliberately cheated or taken unfair advantage of
    //       Nairaboom or any of its customers; <br />
    //       (d) Nairaboom is requested to do so by the police, any regulatory
    //       authority or court; <br />
    //       (e) Nairaboom considers that any of the events referred to in (a) to
    //       (c) above may have occurred or are likely to occur; <br /> 3.16 If
    //       Nairaboom closes or suspends your account for any of the reasons
    //       referred to in (a) to (e) above, you shall be liable for any and all
    //       claims, losses, liabilities, damages, costs and expenses incurred or
    //       suffered by Nairaboom (together “Claims”) arising from and shall
    //       indemnify and hold Nairaboom harmless on demand for such Claims. In
    //       the circumstances referred to in (a) to (e) above, Nairaboom shall
    //       also be entitled to withhold and/or retain any and all amounts which
    //       would otherwise have been paid or payable to you (including any
    //       winnings or bonus payments).
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>
    //         Other Intellectual Property Rights <br /> Copyright Information and
    //         Non-Commercial Use Limitation
    //       </Text>
    //       The service and its contents, features and functionality, processes
    //       including but not limited to, all information, products, services,
    //       text, displays, graphics, video, audio and software as well as the
    //       design, selection and arrangement thereof (collectively, “content”),
    //       are owned by machinepush and its affiliates as guided by intellectual
    //       property or proprietary rights laws. These terms and conditions of use
    //       permit you to use the service for your personal use only. you must not
    //       reproduce, distribute, modify, create derivative works of, publicly
    //       display, publicly perform, republish, recreate, store or transmit any
    //       of the content on the service and conditions of use and may violate
    //       copyright, trademark and other laws.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>Trademarks</Text>The company name, the company
    //       logo and all related names, logos, product and service names, designs,
    //       slogans and processes are trademarks of the company or its affiliates
    //       or licensors. you must not use such marks without the prior written
    //       permission of the company or try to replicate our technical &
    //       commercial processes for any reason whatsoever. all other names,
    //       logos, product and service names, designs and slogans are the
    //       trademarks of their respective owners.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>
    //         Changes to the Terms and Conditions of Use
    //       </Text>
    //       We reserve the right to change these terms and conditions of use at
    //       any time without prior notice to you. if these terms and conditions of
    //       use are modified, we will update the “last modified date” and such
    //       changes will be effective upon posting. if we make what we determine
    //       to be material changes to these terms and conditions of use, we will
    //       notify you by prominently posting a notice or by sending a notice to
    //       the e-mail addresses on file. your continued use of the service
    //       following such material changes requires your affirmative consent to
    //       the changes. if you do not agree to the changes, your sole remedy is
    //       to cease using the service you are expected to check this page each
    //       time you access this service so you are aware of any changes, as they
    //       are binding on you.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>Disclaimer of Warranties</Text>
    //       OUR USE OF THE SERVICE, ITS CONTENT AND ANY ITEMS OBTAINED THROUGH THE
    //       SERVICE IS AT YOUR OWN RISK. THE SERVICE, ITS CONTENT AND ANY ITEMS
    //       OBTAINED THROUGH THE SERVICE ARE PROVIDED ON AN “AS IS” AND “AS
    //       AVAILABLE” BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS
    //       OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH THE
    //       COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE
    //       COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY OR AVAILABILITY
    //       OF THE SERVICE, ITS CONTENT OR ANY ITEMS OBTAINED THROUGH THE SERVICE.
    //       WITHOUT LIMITING THE FOREGOING, NEITHER THE COMPANY NOR ANYONE
    //       ASSOCIATED WITH THE COMPANY REPRESENTS OR WARRANTS THAT THE SERVICE,
    //       ITS CONTENT OR ANY ITEMS OBTAINED THROUGH THE SERVICE WILL BE
    //       ACCURATE, COMPLETE, USEFUL, RELIABLE, ERROR-FREE OR UNINTERRUPTED,
    //       THAT THE SERVICE, ITS CONTENT OR ANY ITEMS OBTAINED THROUGH THE
    //       SERVICE WILL OPERATE IN THE CONFIGURATION OR WITH THE HARDWARE OR
    //       SOFTWARE YOU USE, THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICE OR
    //       THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER
    //       HARMFUL COMPONENTS OR THAT THE SERVICE OR ANY ITEMS OBTAINED THROUGH
    //       THE SERVICE WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.
    //       <br /> THE INFORMATION IN THE SERVICE MAY BE OUT OF DATE, AND THE
    //       COMPANY MAKES NO COMMITMENT TO UPDATE SUCH INFORMATION. WARRANTIES
    //       THAT CANNOT BE EXCLUDED OR THE COMPANY HEREBY DISCLAIMS ALL WARRANTIES
    //       OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE,
    //       INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY,
    //       NON-INFRINGEMENT AND FITNESS FOR PARTICULAR PURPOSE. THE FOREGOING
    //       DOES NOT AFFECT ANYLIMITED UNDER APPLICABLE LAW.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>Limitation on Liability</Text>
    //       YOUR ACCESS TO AND USE OF THE SERVICE, ITS CONTENT AND ANY ITEMS
    //       OBTAINED THROUGH THE SERVICE IS AT YOUR OWN RISK. IN NO EVENT WILL THE
    //       COMPANY, ITS AFFILIATES, LICENSORS AND SERVICE PROVIDERS, AND ITS AND
    //       THEIR RESPECTIVE OFFICERS, DIRECTORS, MANAGERS, EMPLOYEES,
    //       SHAREHOLDERS, CONTRACTORS, AGENTS, REPRESENTATIVES, LICENSORS,
    //       SUPPLIERS, SUCCESSORS AND ASSIGNS (COLLECTIVELY, THE “RELEASED
    //       PARTIES”) BE LIABLE TO YOU OR ANY THIRD PARTY FOR DAMAGES OF ANY KIND,
    //       UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR
    //       ACCESS, USE, OR INABILITY TO USE, THE SERVICE, ANY SITES LINKED TO IT,
    //       ANY CONTENT ON THE SERVICE OR SUCH OTHER ITEMS OBTAINED THROUGH THE
    //       SERVICE, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL,
    //       CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO,
    //       PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF
    //       REVENUE, LOSS OF PROFITS, LOSS OF WINNINGS, LOSS OF BUSINESS OR
    //       ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA,
    //       WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT OR
    //       OTHERWISE, EVEN IF FORESEEABLE. THE RELEASED PARTIES ASSUME NO
    //       LIABILITY OR RESPONSIBILITY FOR ANY ERRORS OR OMISSIONS IN THE CONTENT
    //       OF THE SERVICE OR FOR ANY DAMAGES TO OR INTERFERENCE WITH EQUIPMENT,
    //       MOBILE DEVICES, PROGRAMS, FILES, OR OTHER PROPERTY, WHETHER SUCH
    //       DAMAGES ARE RELATED TO ACCESS OR USE OF THE SERVICE OR ANY SITES
    //       LINKED TO IT. FURTHER, IN NO EVENT SHALL THE COMPANY BE LIABLE FOR
    //       FAILURE OR DELAY IN PERFORMING AN OBLIGATION UNDER THESE TERMS AND
    //       CONDITIONS OF USE, INCLUDING BUT NOT LIMITED TO TICKETS OR COLLECTING
    //       WINNINGS, IF IT IS PREVENTED FROM DOING SO BY CAUSES BEYOND ITS
    //       CONTROL SUCH AS A FORCE MAJEURE EVENT OR THE ACTIONS OF ANY REGULATORY
    //       COMMISSION OR ORGANIZATION, OR ANY FEDERAL, STATE OR LOCAL
    //       GOVERNMENTS. EXCEPT AS PROVIDED OTHERWISE IN THESE TERMS AND
    //       CONDITIONS OF USE, YOUR SOLE REMEDY FOR DISSATISFACTION WITH OR DAMAGE
    //       SUSTAINED IN CONNECTION WITH THE SERVICE OR THE CONTENT OFFERED
    //       THEREON IS TO STOP USING THE SERVICE. YOUR PERMISSION TO USE THE
    //       SERVICE MAY AUTOMATICALLY TERMINATE WITHOUT NOTICE AT THE COMPANY’S
    //       SOLE DISCRETION.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>5.0 Indemnification</Text>
    //       You agree to defend, indemnify and hold harmless the released parties
    //       from and against any claims, liabilities, damages, judgments, awards,
    //       losses, costs, expenses or fees (including reasonable attorneys’ fees)
    //       arising out of or relating to your violation of these terms and
    //       conditions of use or your use of the service, including, but not
    //       limited to, any use of the service’s content and products other than
    //       as expressly authorized in these terms and conditions of use or your
    //       use of any information obtained from the service. if you are obligated
    //       to provide indemnification hereunder, the company may, in its sole and
    //       absolute discretion, control the disposition of any claim at your sole
    //       cost and expense. without limitation of the foregoing, you will not
    //       settle, compromise or in any other manner dispose of any claim without
    //       the company’s written consent. if you are obligated to provide
    //       indemnification hereunder, the company may withhold any payment it is
    //       otherwise required to make to you to offset your indemnity
    //       obligations.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>6.0 Governing Law and Dispute Resolution</Text>
    //       All matters relating to the company, the service, these terms and
    //       conditions of use and any dispute or claim arising there from or
    //       related thereto (in each case, including non-contractual disputes or
    //       claims), shall be governed by and construed in accordance with the
    //       internal laws of the federal republic of nigeria without giving effect
    //       to any choice or conflict of law provision or rule.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>7.0 Limitation on Time to File Claims</Text>
    //       Any cause of action or claim you may have arising out of or relating
    //       to these terms and conditions of use or the service must be commenced
    //       within 30days (30) after the cause of action accrues, otherwise, such
    //       cause of action or claim is permanently barred.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>8.0 Tax Obligation</Text>
    //       You acknowledge that you are responsible to report your income and pay
    //       any taxes due to the appropriate federal, state and local authorities
    //       in the federal republic of nigeria and in the country you reside. you
    //       further acknowledge that the appropriate regulatory bodies may retain
    //       a portion of your winnings and forward it to the appropriate tax
    //       authority on your behalf.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>9.0 Waiver and Severability</Text>
    //       No waiver of by the company of any term or condition set forth in
    //       these terms and conditions of use shall be deemed a further or
    //       continuing waiver of such term or condition or a waiver of any other
    //       term or condition, and any failure of the company to assert a right or
    //       provision under these terms and conditions of use shall not constitute
    //       a waiver of such right or provision. If any provision of these terms
    //       and conditions of use is held by a court or other tribunal of
    //       competent jurisdiction to be invalid, illegal or unenforceable for any
    //       reason, such provision shall be eliminated or limited to the minimum
    //       extent such that the remaining provisions of the terms and conditions
    //       of use will continue in full force and effect.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>10.0 Assignment</Text>
    //       The company may assign its rights and obligations under this
    //       agreement, in whole or in part, to any person or entity at any time
    //       without notice to you and without your consent. upon such assignment,
    //       the company may be relieved of any further obligation hereunder. you
    //       may not assign or delegate any rights or obligations under these terms
    //       and conditions of use without the company’s prior written consent, and
    //       any unauthorized assignment and delegation by you is void and
    //       ineffective.
    //     </Text>
    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>11.0 Relationship of Parties</Text>
    //       You acknowledge and agree that no joint venture, partnership, or
    //       employment relationship exists between you and the company as a result
    //       of this these terms and conditions of use or your use of the service.
    //       you agree not to hold yourself out as representative, agent, operator,
    //       distributor, or employee of the company and the company shall not be
    //       liable for any of your representations, acts, or omissions. you also
    //       acknowledge and agree that, except as otherwise expressly provided in
    //       these terms and conditions of use, there shall be no third-party
    //       beneficiaries.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>12.0 Force Majeure</Text>
    //       The company shall not be liable for any delay or failure to perform
    //       resulting from unforeseen circumstances or causes outside its
    //       reasonable control, including, without limitation, extreme weather and
    //       other acts of god, natural catastrophes, war, terrorism, riots,
    //       embargoes, acts of civil or military authorities, fire, floods,
    //       accidents, network infrastructure failures, computer viruses strikes,
    //       or shortages of transportation facilities, transportation stoppages or
    //       slowdowns, and stoppage or slowdown of the internet or other networks
    //       (each, a “force majeure event”).
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>13.0 Bonus Administration</Text>
    //       Every bonus earned can only be collected together with a winning ,
    //       bonuses earned are accumulated till your next winning.
    //     </Text>

    //     <Text
    //       w="90%"
    //       margin="auto"
    //       fontFamily={"poppins"}
    //       fontSize={{base: '1rem', md: '1.3rem'}}
    //       pb="2rem"
    //     >
    //       <Text fontWeight={700}>14.0 Entire Agreement</Text>
    //       These terms and conditions of use, our privacy policy and any
    //       applicable limited power of attorney constitute the sole and entire
    //       agreement between you and the company with respect to the service and
    //       supersede all prior and contemporaneous understandings, agreements,
    //       representations and warranties, both written and oral, with respect to
    //       the service. nothing in the terms and conditions of use, express or
    //       implied, shall be deemed to confer any rights or remedies upon, nor
    //       obligate any of the parties hereto, to any person or entity other than
    //       such parties, unless so stated to the contrary. <br />© 2024
    //       Nairaboom. All Rights Reserved
    //     </Text>
    //   </Box>
    //   {/* <FooterComponent /> */}
    //   <Footer3 />
    // </Box>
    <Box>
      <NavBar />
      <BackgroundTitle longbit="Terms & Condit" shortbit="ions" />
      <Box margin="auto" px={{ base: ".5rem", md: "2rem" }} py="2rem">
        <Text
          w="90%"
          textTransform={"uppercase"}
          margin={"auto"}
          fontWeight={700}
          fontSize="1.75rem"
          fontFamily={"poppins"}
          color={"nairablue"}
        >
          Terms of Service
        </Text>
        <Text
          w="90%"
          margin="auto"
          fontFamily={"poppins"}
          fontSize={{base: '1rem', md: '1.3rem'}}
          pb="2rem"
          lineHeight={"2rem"}
          color={"nairablue"}
        >
          Welcome to NairaBoom, the
          <Text fontWeight={700}>
            world&rsquo;s first licensed financial alert rollover lottery/gaming
            service fintech railed mobile spin lotto game 
          </Text>
          service provided by MachinePush Nigeria Limited (&quot;MachinePush&quot; or
          &quot;We&quot;), a private limited liability company registered with
          the CAC under laws of the Federal Republic Of Nigeria.
          <Text fontWeight={700}>
            1.0 Acceptance of the Terms and Conditions of Use
          </Text>
          Please read the following Terms of Service carefully. By opting into
          this platform, you are agreeing to these Terms of Service.<br/> By opting
          in or requesting to play NairaBoom games either on any designated web
          application, mobile app or terminal made available to you, you hereby
          (i) acknowledge that you agree to be bound to and abide by these terms
          and conditions of use and (ii) represent and warrant that you are
          eligible to access the service and are authorized and able to accept
          these terms and conditions of use. If you do not wish to be bound by
          these terms and conditions of use, you must NOT opt in, signup,
          request for, play a game, access or use the service.
          <Text fontWeight={700}>
            2.0 General Rules, Policies &amp; Procedures
          </Text>
          <Text fontWeight={700}>Eligibility</Text>
          To be eligible you must (i) possess the capacity to receive valid
          successful financial debit or credit notifications (Alerts). You
          must, at the time of registration &amp; signup (i) be at least
          eighteen (18) years of age or the age of majority in your jurisdiction
          of residence, whichever is greater, (ii) be physically located in a
          state in the Federal Republic of Nigeria (iii) &amp; at all times
          abide by these terms and conditions of use. <br/>The company reserves the
          right to verify your age, identity and eligibility at any time. Any
          failure to cooperate with the company in this respect may result in
          the forfeiture of your of NairaBoom profile, rollovers &amp;
          cashouts. Employees, officers, directors, members, managers,
          investors, agents, and representatives of the company and any of its
          or their parent companies, subsidiaries, 
          affiliates as well as direct technology vendors, content providers,
          component suppliers (both hardware and software) directly related to
          the company, and each of their respective immediate family (defined as
          parents, spouse, partner, and children) and any person residing in the
          same household are not eligible to use the service, such persons may,
          however, access the service, and will from time to time do so for the
          purpose of testing the service, including, without limitation,
          evaluating user experience, and other reasonable and fair uses at the
          sole discretion of the company. <br/>By accessing or using the service, you
          represent and warrant that you have the right, authority and capacity
          to enter into this agreement, to abide by all of these terms and
          conditions of use, and that you are not prohibited from accessing or
          using the service. The company makes no representations or warranties,
          implicit or explicit, as to your legal right to access or use the
          service and no person affiliated, or claiming affiliation, with the
          company shall have authority to make any such representations or
          warranties. The company reserves the right to deny access to the
          service to anyone at its sole discretion.
        </Text>

        <Text
          w="90%"
          margin="auto"
          fontFamily={"poppins"}
          fontSize={{base: '1rem', md: '1.3rem'}}
          pb="2rem"
          lineHeight={"2rem"}
          color={"nairablue"}
        >
          <Text fontWeight={700}>3.0 Compliance</Text>
          You will comply with all of the terms and conditions of this agreement
          and all applicable laws, regulations and rules when you use the
          service. A user must be 18 years or older to participate in the
          service. These rules &amp; policies are valid only where legal. You
          are responsible for ensuring that it is legal for you to enter the
          service in your local jurisdiction. The company reserves the right to
          cancel a user&rsquo;s entry if behaviour is deemed unacceptable by
          MachinePush Nigeria Limited or any of our affiliates. In the event of
          any winning generated from an account which is not in strict
          compliance of the present terms and conditions of use, the rights to
          said winning may be compromised.
          <Text fontWeight={700}>Notice of Modifications or Changes</Text>
          The company may modify the service at any time with or without notice
          to you. The company and its content including, without limitation, the
          information, graphics, products, features, functionality, services,
          processes, modalities and links (collectively the
          &ldquo;content&rdquo;) may be
          changed, deleted or updated without notice. MachinePush may
          discontinue, suspend or <br/>modify the service at any time without notice,
          and the company may block, terminate or suspend your access to the
          service at any time for any reason in its sole discretion, even if
          access continues to be allowed to others.
          <Text fontWeight={700}>Stakes</Text>
          All “stakes, and ticket entries ” must be made for a game to be considered valid  
          to be treated by the next closest winning parameter .
          <Text fontWeight={700}>Payouts & Statutory Withholdings</Text>
          Where applicable by law, the company will subject the payment of any withholding 
          instruction to the statutory withholdings and / or deductions authority.
          <Text fontWeight={700}>Winnings & Payment</Text>
          All cashout payments and bonuses will be made directly into the winners Nairaboom main 
          wallet from where the winners can transfer it out to his bank account at any time he/she 
          pleases. Cashout will be made available in full unless in instances of acute financial 
          insolvency where winnings will be paid in staggered sums in portions as communicated to 
          the winner.
          <Text fontWeight={700}>Daily Entry Limit</Text>
          A person may play as many times as they desire in a day.
          <Text fontWeight={700}>No Transfer</Text>
          Winnings are not transferable.
          <Text fontWeight={700}>Rollover Bonuses</Text>
          All bonus you attract during the course of your membership with Nairaboom remains guided 
          by the boom wallet terms and condition you will find therein within your profile environment.
          <Text fontWeight={700}>Winnings Scope & Tenure</Text>
          All winnings will be valid only for credit or debit alerts not older than 90 days.
          <Text fontWeight={700}>Entry Commitment</Text>
          Once a stake or rollover has been made it cannot be reversed or terminated and will be considered.
          <Text fontWeight={700}>Security</Text>
          Privacy and personal security of user's sensitive information like passwords, pins are responsibilities 
          of the user.
          <Text fontWeight={700}>Indemnification</Text>
          MachinePush ,Nairaboom and all its attendant affiliations are indemnified in event of any 
          fraudulent activity or loss to your bank account during the duration of the service .<br/><br/>
          <Text fontWeight={700}>Updates</Text>
          From time to time, the company may in its sole discretion develop and provide updates, 
          which may include upgrades, bug fixes, patches and other error corrections and/or new 
          features/processes (collectively, including related documentation, <b>"Updates”</b>). Updates 
          may also modify or delete in their entirety certain processes, features and functionality. 
          You agree that the company has no obligation to provide any updates or to continue to 
          provide or enable any particular features or functionality.
          <Text fontWeight={700}>Mobile Device and Service Charges</Text>
          For users who will be opting in via the internet note that this may require communication 
          with the company's servers, including, without limitation, which may consume data. You 
          acknowledge and agree that you are solely responsible for any charges incurred with your 
          data/mobile service provider as a result of use of this service, including any overage 
          and penalties assessed for exceeding the limits imposed by your service provider.
          <p>
          You are responsible for the cost of your mobile device and to ensure that your mobile 
          device meets the system requirements apt for accessing this platform if you choose to 
          access it from the web including obtaining periodic updates or upgrades from your mobile 
          device service provider to continue accessing the web. THE COMPANY DOES NOT WARRANT OR 
          GUARANTEE THAT WEB APP WILL BE COMPATIBLE OR FUNCTION WITH ANY PARTICULAR MOBILE DEVICE, 
          NOR DOES THE COMPANY WARRANT OR ACCEPT ANY LIABILITY FOR OPERATION OF THE MOBILE DEVICE 
          USED TO ACCESS OUR WEB OR SMS/USSD APPLICATION.
          </p>
          <Text fontWeight={700}>Term and Termination</Text>
          The terms and conditions of your use of this service commences when you sign up and accept 
          these terms and conditions of use and will continue in effect for the duration of the 
          service or otherwise stated
          <Text fontWeight={700}>3.0 Your Nairaboom Account</Text>
          <p>
          3.1 All applicants must be over 18 years of age to place a stake or register on NairaBoom. 
          NairaBoom reserves the right to ask for proof of age from any customer and suspend their 
          account until satisfactory documentation is provided. Nairaboom takes its responsibilities 
          in respect of under-age gambling very seriously.
          </p>
          <p>
          3.2 All information supplied when registering with the platform MUST be accurate and complete 
          in all respects. In particular, bank account tied to a user's Nairaboom profile must bear 
          the same name captured on the bank account. Where this is not the case, the user will not 
          be able to transfer funds out their Nairaboom profile to the said bank account till the 
          disparity is corrected.
          </p>
          <p>
          3.3 Nairaboom may verify a user submitted notification (Alert) to confirm its validity 
          before a result or after a result. Any submitted notification that fails the validity 
          test is immediately disqualified from its scheduled draw or any commitment tied to 
          that particular notification  <br/>
          3.4 By accepting the Terms and/or registering to use the platform you hereby agree that 
          we shall be entitled to conduct any and all such identification, credit and other verification 
          checks from time to time that we may require and/or are required by applicable laws and 
          regulations and/or by the relevant regulatory authorities for use of the service and our 
          products generally. You agree to provide all such information as we require in connection 
          with such verification checks. We shall be entitled to suspend or restrict your account in 
          any manner that we may deem in our absolute discretion to be appropriate, until such time 
          as the relevant checks are completed to our satisfaction.
          </p>
          <p>
          3.5 As part of the registration process, we may supply your information details to authorised 
          reference agencies to confirm your identity. You agree that we may process such information 
          in connection with your registration.
          </p>
          <p>
          3.6 Players may open only one account. Should we identify any customer with more than one 
          account we reserve the right to close or suspend any such customer and Nairaboom shall 
          also be entitled to withhold and/or retain any and all amounts which would otherwise 
          have been paid or payable to you (including any winnings or bonus payments).
          </p>
          <p>
          3.7 Customers must keep their registration and account details up to date.<br/>
          </p>
          <p>
          3.8 Nairaboom allows all its customers to choose their own username and password 
          combination when creating an account. Customers must keep this information confidential 
          as you are responsible for all stakes placed on your account and any other activities 
          taking place on your account.
          </p>
          <p>
          3.9 Rollover & Stakes will stand if your username and password have been entered 
          correctly (whether or not authorised by you), subject to there being sufficient 
          funds in the account.
          </p>
          <p>
          3.10 If, at any time, you feel a third party is aware of your user name and/or 
          password you should change it immediately via the Platform or contact customer care.
          </p>
          <p>
          3.11 You are responsible for all transactions where your name and account number or 
          name and username are correctly quoted (whether or not authorised by you). If you 
          nominate another person as an authorised user of your account, you shall be responsible 
          for all transactions such person makes using the relevant account details. Should you 
          lose your account details or feel that someone else may have your account details, 
          please contact us.
          </p>
          <p>
          3.12 Please note that we will never request your credit /debit card details and any 
          other sensitive data via phone call, text message or email. Should you encounter a 
          request like this, please contact our customer care by sending an email to 
          support@nairaboom.ng
          </p>
          <p>
          3.13 The current balance and transaction history of your account may be viewed 
          at any time once you have logged into your account on the platform.
          </p>
          <p>
          3.14 Your personal information is processed in accordance with our Privacy Policy.<br/>
          </p>
          <p>
          3.15 Nairaboom reserves the right to close or suspend your account at any time 
          and for any reason. Without limiting the preceding sentence, Nairaboom shall 
          be entitled to close or suspend your account if:
          </p>
          <p>(a) you become bankrupt;</p>
          <p>
          (b) Nairaboom considers that you have used the platform in a fraudulent manner 
          or for illegal and/or unlawful or improper purposes;
          </p>
          <p>
          (c) Nairaboom considers that you have used the platform in an unfair manner or 
          have deliberately cheated or taken unfair advantage of Nairaboom or any of its 
          users; or deliberately manipulated the platform.
          </p>
          <p>
          (d) Nairaboom is requested to do so by the police, any regulatory authority or court;
          </p>
          <p>
          (e) Nairaboom considers that any of the events referred to in (a) to (c) above 
          may have occurred or are likely to occur;
          </p>
          <p>
          3.16 If Nairaboom closes or suspends your account for any of the reasons referred to in 
          (a) to (e) above, you shall be liable for any and all claims, losses, liabilities, damages, 
          costs and expenses incurred or suffered by Nairaboom (together “Claims”) arising from and 
          shall indemnify and hold Nairaboom harmless on demand for such Claims. In the circumstances 
          referred to in (a) to (e) above, Nairaboom shall also be entitled to withhold and/or retain 
          any and all amounts which would otherwise have been paid or payable to you (including any 
          cashout or bonus payments).
          </p>
          <Text fontWeight={700}>4.0 Other Intellectual Property Rights<br/></Text>
          <Text fontWeight={700}><i>Copyright Information and Non-Commercial Use Limitation</i></Text>
          <p>
          The service and its contents, features and functionality, processes including but not limited 
          to, all information, products, services, text, displays, graphics, video, audio and software 
          as well as the design, selection and arrangement thereof (collectively, “content”), are owned 
          by the founders of MachinePush and its affiliates as guided by intellectual property or 
          proprietary rights laws.
          </p>
          <p>
          These terms and conditions of use permit you to use the service for your personal use only. 
          you must not reproduce, distribute, modify, create derivative works of, publicly display, 
          publicly perform, republish, recreate, store or transmit any of the content on the service 
          and conditions of use and may violate copyright, trademark and other laws.<br/>
          </p>
          <Text fontWeight={700}><i>Trademarks</i></Text>
          <p>
          The company name, the company logo and all related names, logos, product and service names, 
          designs, slogans and processes are trademarks of the “creator company” or its affiliates or 
          licensors. You must not use such marks without the prior written permission of the company or 
          try to replicate our technical & commercial processes for any reason whatsoever. All other 
          names, logos, product and service names, designs and slogans are the trademarks of their 
          respective owners.<br/><br/>
          </p>
          <Text fontWeight={700}><i>Changes to the Terms and Conditions of Use</i></Text>
          <p>
          We reserve the right to change these terms and conditions of use at any time without 
          prior notice to you. If these terms and conditions of use are modified, we will 
          update the “last modified date” and such <br/>
          changes will be effective upon posting. If we make what we determine to be material 
          changes to these terms and conditions of use, we will notify you by prominently 
          posting a notice or by sending a notice to the e-mail addresses on file. Your 
          continued use of the service following such material changes requires your affirmative 
          consent to the changes. If you do not agree to the changes, your sole remedy is to 
          cease using the service you are expected to check this page each time you access 
          this service so you are aware of any changes, as they are binding on you.
          </p>
          <Text fontWeight={700}><i>Disclaimer of Warranties</i></Text>
          <p>
          YOUR USE OF THE SERVICE, ITS CONTENT AND ANY ITEMS OBTAINED THROUGH THE SERVICE IS AT 
          YOUR OWN RISK. THE SERVICE, ITS CONTENT AND ANY ITEMS OBTAINED THROUGH THE SERVICE ARE 
          PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, 
          EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY 
          MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, 
          QUALITY, ACCURACY OR AVAILABILITY OF THE SERVICE, ITS CONTENT OR ANY ITEMS OBTAINED THROUGH 
          THE SERVICE. WITHOUT LIMITING THE FOREGOING, NEITHER THE COMPANY NOR ANYONE ASSOCIATED WITH 
          THE COMPANY REPRESENTS OR WARRANTS THAT THE SERVICE, ITS CONTENT OR ANY ITEMS OBTAINED THROUGH 
          THE SERVICE WILL BE ACCURATE, COMPLETE, USEFUL, RELIABLE, ERROR-FREE OR UNINTERRUPTED, THAT THE 
          SERVICE, ITS CONTENT OR ANY ITEMS OBTAINED THROUGH THE SERVICE WILL OPERATE IN THE CONFIGURATION 
          OR WITH THE HARDWARE OR SOFTWARE YOU USE, THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICE OR 
          THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE 
          SERVICE OR ANY ITEMS OBTAINED THROUGH THE SERVICE WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS. 
          THE INFORMATION IN THE SERVICE MAY BE OUT OF DATE, AND THE COMPANY MAKES NO COMMITMENT TO UPDATE 
          SUCH INFORMATION.
          </p>
          <p>
          WARRANTIES THAT CANNOT BE EXCLUDED OR THE COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, 
          WHETHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES 
          OF MERCHANTABILITY, NON-INFRINGEMENT AND FITNESS FOR PARTICULAR PURPOSE. THE FOREGOING DOES NOT 
          AFFECT ANY LIMITED UNDER APPLICABLE LAW.
          </p>
          <Text fontWeight={700}><i>Limitation on Liability</i></Text>
          <p>
          YOUR ACCESS TO AND USE OF THE SERVICE, ITS CONTENT AND ANY ITEMS OBTAINED THROUGH THE SERVICE IS 
          AT YOUR OWN RISK. IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, LICENSORS AND SERVICE PROVIDERS, 
          AND ITS AND THEIR RESPECTIVE OFFICERS, DIRECTORS, MANAGERS, EMPLOYEES, SHAREHOLDERS, CONTRACTORS, 
          AGENTS, REPRESENTATIVES, LICENSORS, SUPPLIERS, SUCCESSORS AND ASSIGNS (COLLECTIVELY, THE “RELEASED 
          PARTIES”) BE LIABLE TO YOU OR ANY THIRD PARTY FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, 
          ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS, USE, OR INABILITY TO USE, THE SERVICE, ANY SITES 
          LINKED TO IT, ANY CONTENT ON THE SERVICE OR SUCH OTHER ITEMS OBTAINED THROUGH THE SERVICE, INCLUDING 
          ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING BUT NOT 
          LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF 
          PROFITS, LOSS OF WINNINGS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, 
          LOSS OF DATA, WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT OR OTHERWISE, EVEN 
          IF FORESEEABLE. THE RELEASED PARTIES ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY ERRORS OR 
          OMISSIONS IN THE CONTENT OF THE SERVICE OR FOR ANY DAMAGES TO OR INTERFERENCE WITH EQUIPMENT, 
          MOBILE DEVICES, PROGRAMS, FILES, OR OTHER PROPERTY, WHETHER SUCH DAMAGES ARE RELATED TO ACCESS 
          OR USE OF THE SERVICE OR ANY SITES LINKED TO IT.
          </p>
          <p>
          FURTHER, IN NO EVENT SHALL THE COMPANY BE LIABLE FOR FAILURE OR DELAY IN PERFORMING AN OBLIGATION 
          UNDER THESE TERMS AND CONDITIONS OF USE, INCLUDING BUT NOT LIMITED TO TICKETS OR COLLECTING WINNINGS, 
          IF IT IS PREVENTED FROM DOING SO BY CAUSES BEYOND ITS CONTROL SUCH AS A FORCE MAJEURE EVENT OR THE 
          ACTIONS OF ANY REGULATORY COMMISSION OR ORGANIZATION, OR ANY FEDERAL, STATE OR LOCAL GOVERNMENTS.
          </p>
          <p>
          EXCEPT AS PROVIDED OTHERWISE IN THESE TERMS AND CONDITIONS OF USE, YOUR SOLE REMEDY FOR DISSATISFACTION 
          WITH OR DAMAGE SUSTAINED IN CONNECTION WITH THE SERVICE OR THE CONTENT OFFERED THEREON IS TO STOP 
          USING THE SERVICE. YOUR PERMISSION TO USE THE SERVICE MAY AUTOMATICALLY TERMINATE WITHOUT NOTICE AT 
          THE COMPANY'S SOLE DISCRETION.<br/><br/>
          </p>
          <Text fontWeight={700}>5.0 Indemnification</Text>
          <p>
          You agree to defend, indemnify and hold harmless the released parties from and against any claims, 
          liabilities, damages, judgments, awards, losses, costs, expenses or fees (including reasonable attorneys' fees) 
          arising out of or relating to your violation of these terms and conditions of use or your use of the service, 
          including, but not limited to, any use of the service's content and products other than as expressly 
          authorized in these terms and conditions of use or your use of any information obtained from the service. 
          If you are obligated to provide indemnification hereunder, the company may, in its sole and absolute 
          discretion, control the disposition of any claim at your sole cost and expense. Without limitation of 
          the foregoing, you will not settle, compromise or in any other manner dispose of any claim without the 
          company's written consent. If you are obligated to provide indemnification hereunder, the company may 
          withhold any payment it is otherwise required to make to you to offset your indemnity obligations.<br/><br/>
          </p>
          <Text fontWeight={700}>6.0 Governing Law and Dispute Resolution</Text>
          <p>
          All matters relating to the company, the service, these terms and conditions of use and any dispute or 
          claim arising there from or related thereto (in each case, including non-contractual disputes or claims), 
          shall be governed by and construed in accordance with the internal laws of the Federal Republic of Nigeria 
          without giving effect to any choice or conflict of law provision or rule.
          </p>
          <Text fontWeight={700}>7.0 Limitation on Time to File Claims</Text>
          <p>
          Any cause of action or claim you may have arising out of or relating to these terms and conditions 
          of use or the service must be commenced within 30days (30) after the cause of action accrues, 
          otherwise, such cause of action or claim is permanently barred.<br/><br/>
          </p>
          <Text fontWeight={700}>8.0 Tax Obligation</Text>
          <p>
          You acknowledge that you are responsible to report your income and pay any taxes due to the appropriate 
          federal, state and local authorities in the Federal Republic of Nigeria and in the country you reside. 
          You further acknowledge that the appropriate regulatory bodies may retain a portion of your winnings 
          and forward it to the appropriate tax authority on your behalf.<br/>
          </p>
          <Text fontWeight={700}>9.0 Waiver and Severability</Text>
          <p>
          No waiver of by the company of any term or condition set forth in these terms and conditions of use 
          shall be deemed a further or continuing waiver of such term or condition or a waiver of any other 
          term or condition, and any failure of the company to assert a right or provision under these terms 
          and conditions of use shall not constitute a waiver of such right or provision.
          </p>
          <p>
          If any provision of these terms and conditions of use is held by a court or other tribunal of 
          competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision 
          shall be eliminated or limited to the minimum extent such that the remaining provisions of the 
          terms and conditions of use will continue in full force and effect.
          </p>
          <Text fontWeight={700}>10.0 Assignment</Text>
          <p>
          The company may assign its rights and obligations under this agreement, in whole or in part, 
          to any person or entity at any time without notice to you and without your consent. Upon such 
          assignment, the company may be relieved of any further obligation hereunder. You may not assign 
          or delegate any rights or obligations under these terms and conditions of use without the company's 
          prior written consent, and any unauthorized assignment and delegation by you is void and ineffective.
          </p>
          <Text fontWeight={700}>11.0 Relationship of Parties</Text>
          <p>
          You acknowledge and agree that no joint venture, partnership, or employment relationship exists 
          between you and the company as a result of this these terms and conditions of use or your use of 
          the service. You agree not to hold yourself out as representative, agent, operator, distributor, 
          or employee of the company and the company shall not be liable for any of your representations, 
          acts, or omissions. You also acknowledge and agree that, except as otherwise expressly provided 
          in these terms and conditions of use, there shall be no third-party beneficiaries.<br/>
          </p>
          <Text fontWeight={700}>12.0 Force Majeure</Text>
          <p>
          The company shall not be liable for any delay or failure to perform resulting from unforeseen 
          circumstances or causes outside its reasonable control, including, without limitation, extreme 
          weather and other acts of god, natural catastrophes, war, terrorism, riots, embargoes, acts of 
          civil or military authorities, fire, floods, accidents, network infrastructure failures, computer 
          viruses strikes, financial insolvency or shortages of transportation facilities, transportation 
          stoppages or slowdowns, and stoppage or slowdown of the internet or other networks (each, a 
          “force majeure event”).
          </p>
          <Text fontWeight={700}>13.0 Rollover Wallet Administration</Text>
          <p>
          Nairaboom Rollover wallet also known as the secondary wallet is a wallet where your Nairaboom in 
          play bonuses, activity earnings and boom point values are accumulated till you trigger a 
          cashout by meeting any of the cashout modalities, the idea is to keep growing and grooming 
          your rollover wallet till you get a cashout  green which is either 3 green boxes or you 
          match the 4 digits of the pre-released Cashout Keys.
          </p>
          <Text fontWeight={700}>14.0 Rollover Wallet Provisos </Text>
          <p>
          Values inside your rollover wallet can only be cashed out if any of the following cash-out 
          parameters are met, check <a href="https://nairaboom.ng/winning">https://nairaboom.ng/winning</a> 
          to see all Cash-Out Parameters.
          </p>
          <Text fontWeight={700}>15.0 Cashout Keys</Text>
          <p>
          At the beginning of every new month a set of Cashout Keys are released and displayed in 
          your user profile and any time you match these keys completely at the bottom of your 
          spinwheel, the value percentage of your rollover wallet is immediately transferred to 
          your primary wallet.
          </p>
          <Text fontWeight={700}>16.0 Rollover Wallet Administration</Text>
          <p>
          Every bonus earned can only be collected together with a winning, bonuses earned 
          are accumulated in your rollover wallet till your next winning or your bonus 
          unlocked when you meet any of the bonus unlocking provisos advertised from 
          time to time.
          </p>
          <Text fontWeight={700}>17.0 Jackpot Administration</Text>
          <p>
          Nairaboom has a graduating jackpot fund that starts at a base of 500,000 Naira 
          and keeps growing after every game play it's not won, Jackpot cap is set at 35 
          million Naira and will be reviewed from time to time.<br/>
          To win the jackpot, all a player needs to do is get 4 green balls at the Spinwheel 
          and you are immediately credited.
          </p>
          <Text fontWeight={700}>18.0 Check-In Administration</Text>
          <p>
          Check-in allows a player to register a valid financial alert without playing a game 
          in event of insufficient funds in main wallet. Each Check-in is charged at a token of 
          10 Naira per check-in. Note check-ins are not considered a stake.
          </p>
          <Text fontWeight={700}>19.0 Cashout Administration</Text>
          <p>
          A Nairaboom cash-out is when any value in your boom wallet is crossed over to your 
          main wallet from where you can move it to any bank account of your choice.<br/>
          A cash-out occurs when any of the following cash-out parameters are met:<br/>
          <ul>
           <li>Match any of the pre-released Cashout Keys</li>
           <li>Get 3 green boxes at the Spinwheel</li>
           <li>Get a random cash-out</li>
           <li>Social Media Challenge Pick</li>
          </ul>
          </p>
          <Text fontWeight={700}>20.0 Alert Administration</Text>
          <p>
          Only valid alerts from a legitimate financial service institution domiciled within 
          the Federal Republic of Nigeria will valid and honoured on the Nairaboom gaming platform. 
          Nairaboom reserves the right to query any alerts reference number if need be , if an 
          alert is found  not to be valid punitive action will be taken against such a player 
          and your account suspended + any cashout denied.  Nairaboom also reserves the right to 
          choose whether to honor any rolled over alert without a reference number or not and 
          this might be used as a basis of nullifying any pending cashout if need be.
          </p>
          <Text fontWeight={700}>21.0 Dormancy </Text>
          <p>
          Any Naira Boom account that has not played a game in 30 days is considered dormant 
          and will have its rollover wallet reset to 0 value, values in the main wallet will 
          however remain intact.
          </p>
          <Text fontWeight={700}>22.0 Monetization Administration </Text>
          <p>
          Your account will get automatically monetized so you can earn regular income from game 
          plays from your pod, monetization occurs when you meet the threshold combination of rollover 
          wallet balance + referrals (Visit your profile to see current published threshold). To keep 
          your monetization button active you have to play a minimum of 5 games monthly.
          </p>
          <Text fontWeight={700}>23.0 Pod Administration  </Text>
          <p>
          Once you refer the recommended number of persons to sign up on Nairaboom you immediately 
          become the leader of your own pod where you now start earning every time a member of your 
          pod plays a game or wins. You can grow your pod to whatever size you want to, the bigger 
          your pod the better. Nairaboom reserves the right to decommission your pod at any point 
          in the event of fraud, platform manipulations and force majeure.
          </p>
          <Text fontWeight={700}>24.0 Entire Agreement  </Text>
          <p>These terms and conditions of use, our privacy policy and any applicable limited power of 
          attorney constitute the sole and entire agreement between you and the company with respect 
          to the service and supersede all prior and contemporaneous understandings, agreements, 
          representations and warranties, both written and oral, with respect to the service. Nothing 
          in the terms and conditions of use, express or implied, shall be deemed to confer any rights 
          or remedies upon, nor obligate any of the parties hereto, to any person or entity other than 
          such parties, unless so stated to the contrary.
          </p>
        </Text>
      </Box>
      <Footer3 />
    </Box>
  );
};

export default TermsConditions;
