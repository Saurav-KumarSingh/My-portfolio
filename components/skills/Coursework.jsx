const Coursework = () => {
  return (
    <div className="skills__content">
        <h3 className="skills__title"> Tools</h3>

        <div className="skills__box">
            

            <div className="skills__group">

                <div className="skills__data">
                    <i className='bx bxl-gitlab' ></i>

                    <div>
                        <h3 className="skills__name">Git</h3>
                    </div>
                </div>

                <div className="skills__data">
                    <i className='bx bxl-visual-studio' ></i>

                    <div>
                        <h3 className="skills__name">VS Code</h3>
                    </div>
                </div>

                <div className="skills__data">
                    <i className='bx bxl-github' ></i>

                    <div>
                        <h3 className="skills__name">GitHub</h3>
                    </div>
                </div>
                <div className="skills__data">
                    <i className='bx bxl-postman' ></i>
                    <div>
                        <h3 className="skills__name">Postman</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Coursework