import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { FaInstagram, FaPhoneVolume} from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { MdEmail } from "react-icons/md";
import { TbBrandYoutube } from "react-icons/tb";

export default function contact() {

    const [name, setName] = useState('');
    const [lname, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [project, setProject] = useState([]);
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [messageok, setMessageOk] = useState('');

    async function createProduct(ev) {
        ev.preventDefault();

        setMessageOk('Sending...')

        const data = { name, lname, email, company, phone, country, project, price, description };

        try {
            await axios.post('/api/contacts', data);
            setMessageOk('✅ message sent successfully')
            setName('');
            setLName('');
            setEmail('');
            setCompany('');
            setPhone('');
            setCountry('');
            setProject('');
            setPrice('');
            setDescription('');
        } catch (error) {
            if (error.response) {
                console.error('server error', error.response.data)
            } else if (error.request) {
                console.error('Network error', error.response.data)
            } else {
                console.error('error', error.message)
            }
            setMessageOk('❌ failed to send message')
        }
    }
    const handleProjectChange = (projectName) => {
        if (project.includes(projectName)) {
            setProject(project.filter(project => project !== projectName))
        } else {
            setProject([...project, projectName])
        }
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };


    return <>
        <Head>
            <title>Contact us</title>
        </Head>
        <div className="contactpage">
            <div className="container">
                <div className="contactformp">
                    <div className="leftcontp">
                        <h2>Get in touch</h2>
                        <h2>Let's talk about your project</h2>
                        <p>Thinking about a new project, a problem to solve, or just want to connect? Let's do it!</p>
                        <p>Use the form on this page or get in touch by other means.</p>
                        <p>We love questions and feedback and we're always happy to help!</p>
                        <div className="leftsociinfo">
                            <ul>
                                <li><FaPhoneVolume /> <span>Phone: <a href="tel:+123456789" target="_blank">+91-123456789</a></span></li>
                                <li><MdEmail /> <span>Email: <a href="mailto:allknowledge34@gmail.com" target="_blank">allknowledge34@gmail.com</a></span></li>
                                <li><TbBrandYoutube /> <span>Youtube: <a href="https://www.youtube.com/@AiCodingHub" target="_blank">AiCodingHub</a></span></li>
                                <li><GrLinkedin /> <span>Linkedin: <a href="https://www.linkedin.com/in/sachin-kumar-355203340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">Sachin Kumar</a></span></li>
                                <li><FaInstagram /> <span>Twitter: <a href="https://www.instagram.com/aicodinghub/" target="_blank">aicodinghub</a></span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="rightcontp">
                        <form onSubmit={createProduct}>
                            <div className="rightconttitle">
                                <h2>Your Contact Information</h2>
                            </div>
                            <div className="rightcontinputs">
                                <input type="text" value={name} onChange={ev => setName(ev.target.value)}
                                    placeholder="First name" required />
                                <input type="text" value={lname} onChange={ev => setLName(ev.target.value)}
                                    placeholder="Last name" />
                                <input type="email" value={email} onChange={ev => setEmail(ev.target.value)}
                                    placeholder="Email address" required />
                                <input type="text" value={company} onChange={ev => setCompany(ev.target.value)}
                                    placeholder="Company name" required />
                                <input type="text" value={phone} onChange={ev => setPhone(ev.target.value)}
                                    placeholder="Phone number" required />
                                <select name="country" value={country} onChange={(e) => setCountry(e.target.value)}
                                    id="country">
                                    <option value="">Select Country</option>
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="American Samoa">American Samoa</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Anguilla">Anguilla</option>
                                    <option value="Antarctica">Antarctica</option>
                                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Aruba">Aruba</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bermuda">Bermuda</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="Brunei">Brunei</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Cameroon">Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Cape Verde">Cape Verde</option>
                                    <option value="Central African Republic">Central African Republic</option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czech Republic">Czech Republic</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">Dominican Republic</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran">Iran</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Korea">Korea</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                    <option value="Laos">Laos</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libya">Libya</option>
                                    <option value="Liechtenstein">Liechtenstein</option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Madagascar">Madagascar</option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Marshall Islands">Marshall Islands</option>
                                    <option value="Mauritania">Mauritania</option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Moldova">Moldova</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montenegro">Montenegro</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">Mozambique</option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea">Papua New Guinea</option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines">Philippines</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russia">Russia</option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                                    <option value="Saint Lucia">Saint Lucia</option>
                                    <option value="Saint Vincent">Saint Vincent</option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino">San Marino</option>
                                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Seychelles">Seychelles</option>
                                    <option value="Sierra Leone">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Slovakia">Slovakia</option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands">Solomon Islands</option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Swaziland">Swaziland</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Syria">Syria</option>
                                    <option value="Taiwan">Taiwan</option>
                                    <option value="Tajikistan">Tajikistan</option>
                                    <option value="Tanzania">Tanzania</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan">Turkmenistan</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="United States">United States</option>
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Uzbekistan">Uzbekistan</option>
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Vietnam">Vietnam</option>
                                    <option value="Yemen">Yemen</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                            </div>
                            <div className="rightconttitle">
                                <h2>What services do you need for your project?</h2>
                            </div>
                            <div className="rightcontcheckbox">
                                {[
                                    'Website Development',
                                    'App Development',
                                    'Game Development',
                                    'Ai Development',
                                    'Design',
                                    'Video Editing',
                                    'Photo Editing'
                                ].map((projectOption) => (
                                    <label key={projectOption} className="cyberpunk-check-label">
                                        <input type="checkbox"
                                            className="cyberpunk-checkbox"
                                            value={projectOption}
                                            checked={project.includes(projectOption)}
                                            onChange={() => handleProjectChange(projectOption)} />
                                        {projectOption}
                                    </label>
                                ))}
                            </div>
                            <div className="rightconttitle">
                                <h2>How much is the anticipated budget for your next project?</h2>
                            </div>
                            <div className="rightcontredio">
                                {['Less than ₹5000', '₹5000-₹10000', '₹10000-₹20000', '₹20000-₹30000', '₹30000-₹40000', 'More than ₹50000'].map(
                                    (priceRange) => (
                                        <div key={priceRange} className="radio-button">
                                            <label htmlFor={priceRange}>
                                                <input
                                                    type="radio"
                                                    id={priceRange}
                                                    name="example-radio"
                                                    value={priceRange}
                                                    checked={price === priceRange}
                                                    onChange={handlePriceChange}
                                                />
                                                <span className="custom-radio"></span>
                                                {priceRange}
                                            </label>
                                        </div>
                                    )
                                )}
                            </div>

                            <div className="rightconttitle">
                                <h2>Tell me about your project</h2>
                            </div>
                            <div className="rightcontpera">
                                <textarea value={description} onChange={ev => setDescription(ev.target.value)}
                                    name="description" rows={4} id="" placeholder="Project description"></textarea>
                            </div>
                            <hr />
                            <div className="righhcontsbtn flex gap-3">
                                <button type="submit">Submit</button>
                                <p>{messageok}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}