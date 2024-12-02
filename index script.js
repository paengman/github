const shapes = document.querySelectorAll('.shape');
        const followSpeed = 0.05; // 움직임 속도
        const bounceSpeed = 0.5; // 튕길 때의 속도
        const mousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const gridRows = 5; // 그리드의 행 수
        let isGrided = false; // 그리드 상태
    
        function initializeShapes() {
            const positions = [];
            shapes.forEach((shape, index) => {
                let posX, posY;
                let isOverlapping;
    
                do {
                    posX = Math.random() * (window.innerWidth - shape.offsetWidth);
                    posY = Math.random() * (window.innerHeight - shape.offsetHeight - 100); // 상단 글자 아래에 위치하도록 수정
                    isOverlapping = false;
    
                    for (let i = 0; i < positions.length; i++) {
                        const [otherX, otherY] = positions[i];
                        const distance = Math.sqrt(Math.pow(posX - otherX, 2) + Math.pow(posY - otherY, 2));
                        // 도형의 stroke가 만났을 때 (겹쳤을 때의 거리 기준)
                        if (distance < (shape.offsetWidth / 2 + shapes[i].offsetWidth / 2)) {
                            isOverlapping = true;
                            break;
                        }
                    }
                } while (isOverlapping);
    
                positions.push([posX, posY]);
                shape.style.left = `${posX}px`;
                shape.style.top = `${posY}px`;
            });
        }
    
        function moveShapes() {
            if (!isGrided) { // 그리드 상태가 아닐 때만 이동
                shapes.forEach(shape => {
                    let posX = parseFloat(shape.style.left);
                    let posY = parseFloat(shape.style.top);
    
                    const dx = mousePosition.x - posX;
                    const dy = mousePosition.y - posY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
    
                    // 마우스와의 거리가 100px 이하일 때만 따라가도록 함
                    if (distance < 150) {
                        posX += dx * followSpeed;
                        posY += dy * followSpeed;
                        shape.style.left = `${posX}px`;
                        shape.style.top = `${posY}px`;
                    }
    
                    // 충돌 체크
                    shapes.forEach(otherShape => {
                        if (shape !== otherShape) {
                            const otherPosX = parseFloat(otherShape.style.left);
                            const otherPosY = parseFloat(otherShape.style.top);
                            const otherDistance = Math.sqrt(Math.pow(posX - otherPosX, 2) + Math.pow(posY - otherPosY, 2));
    
                            // 도형의 stroke가 만났을 때
                            if (otherDistance < (shape.offsetWidth / 2 + otherShape.offsetWidth / 2)) {
                                // 튕기기
                                posX += (shape.offsetWidth / 2 + otherShape.offsetWidth / 2 - otherDistance) * bounceSpeed * (dx > 0 ? -1 : 1);
                                posY += (shape.offsetWidth / 2 + otherShape.offsetWidth / 2 - otherDistance) * bounceSpeed * (dy > 0 ? -1 : 1);
                                shape.style.left = `${posX}px`;
                                shape.style.top = `${posY}px`;
                            }
                        }
                    });
                });
            }
        }
    
        function arrangeShapesInGrid() {
            const shapeTypes = {
                circle: Array.from(shapes).slice(0, 3),
                ellipse: Array.from(shapes).slice(3, 6),
                square: Array.from(shapes).slice(6, 10),
                rectangle: Array.from(shapes).slice(10, 12),
                triangle: Array.from(shapes).slice(12, 15),
            };
    
            const rowHeight = 200; // 각 행의 높이
    
            // 각 도형을 그리드에 정렬
            let rowIndex = 0;
            let colIndex = 0;
            const shapeWidth = 280; // 도형의 너비 (정사각형 기준)
            const totalWidth = gridRows * shapeWidth; // 전체 그리드 너비
            const offsetX = (window.innerWidth - totalWidth) / 1; // 화면의 가운데로 정렬하기 위한 X 오프셋

            for (const [shapeType, shapesArray] of Object.entries(shapeTypes)) {
                shapesArray.forEach((shape, index) => {
                    shape.style.left = `${colIndex * shapeWidth + offsetX}px`;
                    shape.style.top = `${rowIndex * rowHeight + 230}px`; // 상단 글자 아래에 위치
                    colIndex++;
    
                    // 그리드 열 수 초과 시 다음 행으로 이동
                    if (colIndex >= gridRows) {
                        colIndex = 0;
                        rowIndex++;
                    }
                });
                rowIndex++; // 다음 행으로 넘어감
                colIndex = 0; // 열 초기화
            }
        }
    
        // 스크롤과 .main-section 제어 함수
        function toggleGridState() {
            const body = document.body;
            const mainSection = document.querySelector('.main-section');
            
            if (isGrided) {
                body.style.overflow = 'auto'; // 스크롤 활성화
                mainSection.style.visibility = 'visible'; // 정렬되면 보이게
            } else {
                body.style.overflow = 'hidden'; // 스크롤 비활성화
                mainSection.style.visibility = 'hidden'; // 흩어지면 숨기기
            }
        }
        
        document.querySelector('.grid-button').addEventListener('click', function() {
            isGrided = !isGrided;
            this.textContent = isGrided ? 'SCATTER' : 'GRID';
    
            if (isGrided) {
                arrangeShapesInGrid();
            } else {
                initializeShapes();
            }
            toggleGridState(); // 스크롤 및 .main-section 상태 제어
        });
    
        window.addEventListener('mousemove', (e) => {
            mousePosition.x = e.clientX;
            mousePosition.y = e.clientY;
        });
    
        // 초기 도형 위치 설정
        initializeShapes();
    
        // 애니메이션 루프 시작
        function animate() {
            moveShapes();
            requestAnimationFrame(animate);
        }
    
        animate();

        document.querySelector('.home-button').addEventListener('click', function () {
            window.location.href = 'index.html'; // index.html로 이동
        });        

        document.getElementById("reload").addEventListener("click", function() {
            location.reload(); // 페이지 새로고침
        });

        // 요소 가져오기
        const gh1 = document.querySelector('.gh1');
        const gh1Modal = document.querySelector('.gh1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        gh1.addEventListener('mouseenter', () => {
            gh1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        gh1.addEventListener('mouseleave', () => {
            gh1Modal.style.display = 'none';
        });

        const gchok1 = document.querySelector('.gchok1');
        const gchok1Modal = document.querySelector('.gchok1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        gchok1.addEventListener('mouseenter', () => {
            gchok1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        gchok1.addEventListener('mouseleave', () => {
            gchok1Modal.style.display = 'none';
        });

        const dbr1 = document.querySelector('.dbr1');
        const dbr1Modal = document.querySelector('.dbr1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        dbr1.addEventListener('mouseenter', () => {
            dbr1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        dbr1.addEventListener('mouseleave', () => {
            dbr1Modal.style.display = 'none';
        });

        const ccgr1 = document.querySelector('.ccgr1');
        const ccgr1Modal = document.querySelector('.ccgr1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        ccgr1.addEventListener('mouseenter', () => {
            ccgr1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        ccgr1.addEventListener('mouseleave', () => {
            ccgr1Modal.style.display = 'none';
        });

        // 요소 가져오기
        const pnx1 = document.querySelector('.pnx1');
        const pnx1Modal = document.querySelector('.pnx1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        pnx1.addEventListener('mouseenter', () => {
            pnx1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        pnx1.addEventListener('mouseleave', () => {
            pnx1Modal.style.display = 'none';
        });

        // 요소 가져오기
        const gljh1 = document.querySelector('.gljh1');
        const gljh1Modal = document.querySelector('.gljh1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        gljh1.addEventListener('mouseenter', () => {
            gljh1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        gljh1.addEventListener('mouseleave', () => {
            gljh1Modal.style.display = 'none';
        });

        // 요소 가져오기
        const asru1 = document.querySelector('.asru1');
        const asru1Modal = document.querySelector('.asru1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        asru1.addEventListener('mouseenter', () => {
            asru1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        asru1.addEventListener('mouseleave', () => {
            asru1Modal.style.display = 'none';
        });

        // 요소 가져오기
        const agtp1 = document.querySelector('.agtp1');
        const agtp1Modal = document.querySelector('.agtp1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        agtp1.addEventListener('mouseenter', () => {
            agtp1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        agtp1.addEventListener('mouseleave', () => {
            agtp1Modal.style.display = 'none';
        });

        // 요소 가져오기
        const yk1 = document.querySelector('.yk1');
        const yk1Modal = document.querySelector('.yk1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        yk1.addEventListener('mouseenter', () => {
            yk1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        yk1.addEventListener('mouseleave', () => {
            yk1Modal.style.display = 'none';
        });

        // 요소 가져오기
        const sau1 = document.querySelector('.sau1');
        const sau1Modal = document.querySelector('.sau1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        sau1.addEventListener('mouseenter', () => {
            sau1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        sau1.addEventListener('mouseleave', () => {
            sau1Modal.style.display = 'none';
        });
        
        // 요소 가져오기
        const mstr1 = document.querySelector('.mstr1');
        const mstr1Modal = document.querySelector('.mstr1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        mstr1.addEventListener('mouseenter', () => {
            mstr1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        mstr1.addEventListener('mouseleave', () => {
            mstr1Modal.style.display = 'none';
        });

        // 요소 가져오기
        const dgrn1 = document.querySelector('.dgrn1');
        const dgrn1Modal = document.querySelector('.dgrn1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        dgrn1.addEventListener('mouseenter', () => {
            dgrn1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        dgrn1.addEventListener('mouseleave', () => {
            dgrn1Modal.style.display = 'none';
        });

        // 요소 가져오기
        const kcha1 = document.querySelector('.kcha1');
        const kcha1Modal = document.querySelector('.kcha1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        kcha1.addEventListener('mouseenter', () => {
            kcha1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        kcha1.addEventListener('mouseleave', () => {
            kcha1Modal.style.display = 'none';
        });

        // 요소 가져오기
        const banana1 = document.querySelector('.banana1');
        const banana1Modal = document.querySelector('.banana1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        banana1.addEventListener('mouseenter', () => {
            banana1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        banana1.addEventListener('mouseleave', () => {
            banana1Modal.style.display = 'none';
        });

        // 요소 가져오기
        const mango1 = document.querySelector('.mango1');
        const mango1Modal = document.querySelector('.mango1-1');

        // 마우스가 gh1 위에 있을 때 모달 표시
        mango1.addEventListener('mouseenter', () => {
            mango1Modal.style.display = 'block';
        });

        // 마우스가 gh1를 떠날 때 모달 숨기기
        mango1.addEventListener('mouseleave', () => {
            mango1Modal.style.display = 'none';
        });

        